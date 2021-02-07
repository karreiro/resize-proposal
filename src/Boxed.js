// import GlobalContext from "./GlobalContext";

import { useCallback, useLayoutEffect, useState } from "react";

function Boxed(text, boxed) {
  const key = text || "<key>";
  const [dragging, setDragging] = useState(null);
  // [!] Use Global context here
  // const ctx = useContext(GlobalContext);
  // like this: ctx.cols, ctx.setCols (but, probably we will intereact with our map here)

  const renderBoxed = useCallback((boxed, index) => {
    if (typeof boxed === "object") {
      return boxed.map((e) => renderBoxed(e, index));
    }
    if (typeof boxed === "function") {
      return boxed(index + 1);
    }
    return "<value>";
  }, []);

  const refreshItemsPosition = useCallback(
    (event) => {
      if (!dragging || !dragging.parentElement) {
        return;
      }
      const rects = dragging.parentElement.getClientRects();
      if (rects.length <= 0) {
        return;
      }
      const width = event.clientX - rects[0].x;
      const type = dragging.dataset.draggable;
      const index = dragging.dataset.draggableIndex;
      if (type === "key") {
        // Change to use a map on GlobalContext
        document
          .querySelectorAll(`[data-draggable-target="key-${index}"]`)
          .forEach((e) => {
            e.style.width = width + "px";
          });
      }
      if (type === "value") {
        // Change to use a map on GlobalContext
        document
          .querySelectorAll(`[data-draggable-target="value-${index}"]`)
          .forEach((e) => {
            e.style.width = width + "px";
          });
      }
    },
    [dragging]
  );

  const startDrag = useCallback(
    (event) => {
      const element = event.target;
      if (element.dataset.draggable !== undefined) {
        setDragging(element);
      }
    },
    [setDragging]
  );

  const stopDrag = useCallback(
    (event) => {
      setDragging(null);
      refreshItemsPosition(event);
    },
    [setDragging, refreshItemsPosition]
  );

  useLayoutEffect(() => {
    window.onmousedown = (event) => startDrag(event);
    window.onmouseup = (event) => stopDrag(event);
    window.onmousemove = (event) => refreshItemsPosition(event);
  }, [startDrag, stopDrag, refreshItemsPosition]);

  const templateFn = useCallback(
    (index) => (
      <div className="boxed">
        <div className="key" data-draggable-target={`key-${index}`}>
          <div>Key {index}</div>
          <div>{key}</div>
          <span
            data-draggable="key"
            data-draggable-index={index}
            className="draggable-line"
          ></span>
        </div>
        <div className="value" data-draggable-target={`value-${index}`}>
          <div>Value</div>
          <div>{renderBoxed(boxed, index)}</div>
          <span
            data-draggable="value"
            data-draggable-index={index}
            className="draggable-line"
          ></span>
        </div>
      </div>
    ),
    [key, renderBoxed, boxed]
  );

  return templateFn;
}

export default Boxed;
