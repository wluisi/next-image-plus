import * as React from "react";

export function useAccordion() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const uid = React.useId();
  const buttonId = `accordion-button-${uid}`;
  const panelId = `accordion-panel-${uid}`;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  // @ts-expect-error - fix me later
  const getButtonProps = (props, ref) => {
    return {
      ...props,
      ref,
      id: buttonId,
      type: "button",
      "aria-expanded": !!isOpen,
      "aria-controls": panelId,
      onClick: handleClick,
    };
  };
  // @ts-expect-error - fix me later
  const getPanelProps = (props, ref) => {
    return {
      ...props,
      ref,
      id: panelId,
      role: "region",
      "aria-labelledby": buttonId,
      // isOpen: isOpen,
      hidden: !isOpen,
    };
  };

  return {
    isOpen,
    getButtonProps,
    getPanelProps,
  };
}
