import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule {
  initState() {
    return {
      name: [],
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  open(name) {
    this.setState(
      {
        name: [...this.getState().name, name],
        // name: this.getState().name.push("name"),
      },
      `Открытие модалки ${name}`
    );
  }

  /**
   * Закрытие модального окна
   */
  close() {
    const newArr = [...this.getState().name];
    newArr.pop();

    this.setState(
      {
        name: newArr,
      },
      `Закрытие модалки`
    );
  }
}

export default ModalsState;
