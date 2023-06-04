import { Controller } from '@hotwired/stimulus';

export class Modal extends Controller {

  /**
   * Stimulus Values
   */
  static values = {
    active: Boolean,
    threshold: Number,
    width: String,
    class: String,
    isOpen: Boolean,
    enable: Boolean,
    bodyOverflow: Boolean,
    closeButton: Boolean,
    closeBackdrop: Boolean
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'template'
  ];

  /**
   * Stimulus: Classes
   */
  static classes = [
    'grid'
  ];

  static public = {
    button: {
      target: 'toggle',
      action: 'modal#open'
    }
  };

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.modalNode = document.getElementById('modal-node') as HTMLDivElement;

    if (!this.hasEnableValue) this.enableValue = true;

  }

  /**
   * Stimulus Connect
   */
  connect (): void {

    // if (localStorage.getItem('newletter_modal') !== '1') {
    //   this.modal = this.element.parentElement;
    //   this.modal.classList.remove('d-none');
    //   this.modal.addEventListener('click', this.hide.bind(this));
    // }

  }

  /**
   * Stimulus Connect
   */
  disconnect (): void {

    if (this.isOpenValue) {

      this.close();

    }

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick ({ target }: MouseEvent) {

    if (target instanceof HTMLElement) {
      if (this.modalNode === target || target.getAttribute('data-close') === 'modal') {
        this.close();
        document.removeEventListener('click', this.outsideClick);
      }
    }

  }

  open () {

    if (this.enableValue === false) return;

    if (!this.isOpenValue) {

      if (this.hasWidthValue) {
        this.modalNode.firstElementChild.setAttribute('style', `width: ${this.widthValue};`);
      } else {
        this.modalNode.firstElementChild.classList.add('row', ...this.classValue.split(' '));
      }

      this.modalNode.classList.add('is-open');
      this.modalNode.firstChild.appendChild(this.templateTarget.content.cloneNode(true));
      this.templateNode = this.modalNode.firstChild.firstChild;
      this.isOpenValue = true;

      document.body.setAttribute('style', 'overflow: hidden;');

      addEventListener('keydown', this.close.bind(this));
      addEventListener('click', this.outsideClick.bind(this));

    }

  }

  /**
   * Hide the GDRP component banner.
   */
  close (event?: KeyboardEvent) {

    if (event && event.key.toUpperCase() !== 'ESCAPE') return;

    if (this.isOpenValue) {

      document.body.removeAttribute('style');

      this.modalNode.classList.remove('is-open');
      this.modalNode.firstChild.removeChild(this.templateNode);
      this.isOpenValue = false;

      removeEventListener('keydown', this.close);

    }

    // localStorage.setItem('newletter_modal', '1');
    // this.modal.classList.add('d-none');
    // this.modal.removeEventListener('click', this.hide);

  };

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  modalNode: HTMLDivElement;
  /**
   * Cloned Node
   */
  templateNode: ChildNode;

  /* -------------------------------------------- */
  /* STIMULUS TYPES                               */
  /* -------------------------------------------- */

  /**
   * Stimulus: The modal target
   */
  modalTarget: HTMLElement;
  /**
   * Stimulus: The template to be rendered within the modal
   */
  templateTarget: HTMLTemplateElement;
  /**
   * Stimulus: Whether or not the modal is open
   */
  isOpenValue: boolean;
  /**
   * Stimulus: Whether or not the modal can be invoked
   */
  enableValue: boolean;
  /**
   * Stimulus: Whether or not the modal can be invoked
   */
  hasEnableValue: boolean;
  /**
   * Stimulus: Whether or not modal closure is allowed by clicking backdrop
   */
  closeBackdropValue: boolean;
  /**
   * Stimulus: Whether or not a close button should render
   */
  closeButtonValue: boolean;
  /**
   * Stimulus: Whether or not the body can scroll when modal is open
   */
  bodyOverflowValue: boolean;
  /**
   * Stimulus: A view width for the modal
   */
  widthValue: string;
  /**
   * Stimulus: A view width for the modal
   */
  hasWidthValue: string;
  /**
   * Stimulus: The show class to toggle the component
   */
  classValue: string;
  /**
   * Stimulus: Grid XXL Class
   */
  hasGridClass: string;

}
