import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTranslate from "@src/hooks/use-translate";
import Layout from "@src/components/layouts/layout";
import LayoutFlex from "@src/components/layouts/layout-flex";
import Input from "@src/components/elements/input";
import Field from "@src/components/elements/field";
import ToolsContainer from "@src/containers/tools";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import Spinner from "@src/components/elements/spinner";

type LocationType = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: { back: string };
};

function Login() {
  const { t } = useTranslate();
  const store = useStore();
  const location = useLocation() as LocationType;
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    waiting: state.session.waiting,
    errors: state.session.errors,
  }));

  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const callbacks = {
    // Ввод логина и пароля
    onChange: useCallback((value: string, name: string) => {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }, []),

    // Отправка логина и пароля
    onSubmit: useCallback(
      (e: React.SyntheticEvent) => {
        e.preventDefault();
        store.get("session").signIn(data, () => {
          // Возврат на предыдущую страницу
          const back: string =
            location.state?.back && location.state?.back !== location.pathname
              ? location.state?.back
              : "/";
          navigate(back);
        });
      },
      [data, location.state]
    ),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={t("auth.title")} />
      <ToolsContainer />

      <LayoutFlex>
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t("auth.title")}</h2>
          <Field label={t("auth.login")} error={select.errors?.login}>
            <Input
              name="login"
              onChange={(e) => callbacks.onChange(e, "login")}
              value={data.login}
            />
          </Field>
          <Field label={t("auth.password")} error={select.errors?.password}>
            <Input
              name="password"
              type="password"
              onChange={(e) => callbacks.onChange(e, "password")}
              value={data.password}
            />
          </Field>
          <Field error={select.errors?.other} />
          <Field>
            <button disabled={select.waiting} type="submit">
              {t("auth.signIn")}
            </button>
          </Field>
        </form>
      </LayoutFlex>
    </Layout>
  );
}

export default React.memo(Login);
