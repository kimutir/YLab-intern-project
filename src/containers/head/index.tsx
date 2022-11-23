import React from "react";
import useTranslate from "@src/hooks/use-translate";
import LayoutHead from "@src/components/layouts/layout-head";
import LocaleSelect from "@src/containers/locale-select";

type HeadContainerProps = {
  title?: string;
};

function HeadContainer(props: HeadContainerProps) {
  const { t } = useTranslate();
  return (
    <LayoutHead title={t(props.title ? props.title : "Магазин")}>
      <LocaleSelect />
    </LayoutHead>
  );
}

export default React.memo(HeadContainer);
