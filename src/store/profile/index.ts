import StateModule from "@src/store/module";
import IProfile, { IProfileData, IProfileResponse } from "./type";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): IProfile {
    return {
      data: {} as IProfileData,
      waiting: false,
    };
  }

  /**
   * Загрузка профиля
   */
  async load() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState(
      {
        waiting: true,
        data: {} as IProfileData,
      },
      "Ожидание загрузки профиля"
    );

    try {
      const json: IProfileResponse = await this.services.api.request({
        url: "/api/v1/users/self",
      });
      // Данные загружены успешно
      this.setState(
        {
          data: json.result,
          waiting: false,
        },
        "Профиль загружен"
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState(
        {
          data: {} as IProfileData,
          waiting: false,
        },
        "Ошибка загрузки профиля"
      );
    }
  }
}

export default ProfileState;
