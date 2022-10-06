import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule {
  initState() {
    return {
      modals: [],
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  open(name, props = {}) {
    this.setState({
      modals: [...this.getState().modals, { name, props }],
    });
  }

  /**
   * Закрытие модального окна
   */
  close(name) {
    this.setState({
      modals: this.getState().modals.filter((modal) => modal.name !== name),
    });
  }
}

export default ModalsState;
