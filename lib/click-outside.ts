/* this is a slight modification to react-detect-click-outside to support ref updates **/

import { MutableRefObject, useCallback, useEffect, useMemo } from "react";
import {} from "react-detect-click-outside";
interface Props {
	ref: MutableRefObject<null>;
	onTriggered: (e: Event) => void;
	disableClick?: boolean;
	disableTouch?: boolean;
	disableKeys?: boolean;
	allowAnyKey?: boolean;
	triggerKeys?: string[];
}

type EventConfigItem = [boolean | undefined, string, (e: Event) => void];

/**
 * Hook used to detect clicks outside a component (or an escape key press). onTriggered function is triggered on `click`, `touch` or escape `keyup` event.
 *
 */
export function useDetectClickOutside({
	ref,
	onTriggered,
	disableClick,
	disableTouch,
	disableKeys,
	allowAnyKey,
	triggerKeys,
}: Props) {
	const keyListener = useCallback(
		(e: KeyboardEvent) => {
			if (allowAnyKey) {
				onTriggered(e);
			} else if (triggerKeys) {
				if (triggerKeys.includes(e.key)) {
					onTriggered(e);
				}
			} else {
				if (e.key === "Escape") {
					onTriggered(e);
				}
			}
		},
		[allowAnyKey, triggerKeys, onTriggered]
	);

	const clickOrTouchListener = useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (ref && ref.current) {
				if (!(ref.current! as any).contains(e.target)) {
					onTriggered?.(e);
				}
			}
		},
		[ref, onTriggered]
	);

	const eventsConfig: EventConfigItem[] = useMemo(
		() => [
			[disableClick, "click", clickOrTouchListener],
			[disableTouch, "touchstart", clickOrTouchListener],
			[disableKeys, "keyup", keyListener],
		],
		[disableClick, disableTouch, disableKeys, clickOrTouchListener, keyListener]
	) as EventConfigItem[];

	useEffect(() => {
		eventsConfig.map((eventConfigItem) => {
			const [isDisabled, eventName, listener] = eventConfigItem;

			if (!isDisabled) {
				document.addEventListener(eventName, listener);
			}
		});

		return () => {
			eventsConfig.map((eventConfigItem) => {
				const [isDisabled, eventName, listener] = eventConfigItem;

				if (!isDisabled) {
					document.removeEventListener(eventName, listener);
				}
			});
		};
	}, [eventsConfig]);

	return ref;
}
