import StateModule from "@src/store/module";
import IModals, { IModal } from "./type";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule {
  initState(): IModals {
    return {
      modals: [],
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  open(name: string, props = {}): void {
    this.setState({
      modals: [...this.getState().modals, { name, props }],
    });
  }

  /**
   * Закрытие модального окна
   */
  close(name: string): void {
    this.setState({
      modals: this.getState().modals.filter(
        (modal: IModal) => modal.name !== name
      ),
    });
  }
}

export default ModalsState;
