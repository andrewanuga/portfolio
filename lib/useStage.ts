"use client";

import { useEffect, useRef } from "react";
import { subscribe, type SceneState } from "./stage";

/**
 * Subscribe an element to the scroll engine. `apply` runs every frame with the
 * element and the current scene — write styles directly, never set React state.
 */
export function useStageEffect<T extends HTMLElement = HTMLDivElement>(
  apply: (el: T, s: SceneState, t: number) => void,
) {
  const ref = useRef<T>(null);
  const fn = useRef(apply);
  fn.current = apply;

  useEffect(
    () =>
      subscribe((s, t) => {
        if (ref.current) fn.current(ref.current, s, t);
      }),
    [],
  );

  return ref;
}
