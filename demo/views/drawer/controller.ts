import { Controller } from '@hotwired/stimulus';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Drawer extends Controller {

  static values = {
    isOpen: Boolean,
    isReady: Boolean,
    outsideClick: Boolean
  };

  static targets = [
    'mount'
  ];

  static classes = [
    'overlay',
    'backdrop'
  ];

  initialize () {

    if (this.element.classList.contains('d-none')) {
      this.element.classList.remove('d-none');
    }

  }

  connect () {

    for (const button of this.buttons) button.addEventListener('click', this.toggle);

  }

  disconnect () {

    for (const button of this.buttons) {

      button.removeEventListener('click', this.toggle);

    }

  }

  toggle = (event: MouseEvent) => {

    event.preventDefault();

    if (event.target instanceof Element) {
      if (event.target.getAttribute('data-spinner') === 'true') {
        event.target.classList.add('loading');
      }
    }

    this.isOpenValue = !this.isOpenValue;

    return this.isOpenValue ? this.doOpen() : this.doClose();

  };

  click (event: MouseEvent) {

    if (this.isOpenValue) this.doClose();

  }

  /**
     * Click detected outside, eg: document body
     */
  outsideClick (event: Event) {

    if (this.backdrop !== event.target && event.target !== this.element) {
      return this.doClose();
    }

  }

  touchMove = (event: TouchEvent) => {

    if (this.isOpenValue) {
      if (this.element.scrollHeight <= this.element.clientHeight) {
        event.preventDefault();
      }
    }

  };

  keyboard = (event: KeyboardEvent) => {

    if (event.keyCode === 27 || event.keyCode === 32) {
      this.doClose();
    }

  };

  doOpen () {

    if (this.hasBackdropClass) this.backdrop.classList.add(this.backdropClass);

    document.documentElement.classList.add('drawer-open');
    this.backdrop.addEventListener('click', this.doClose.bind(this), { passive: true });

    if (this.element instanceof HTMLElement) {
      this.element.focus();
      this.element.setAttribute('aria-hidden', String(false));
      this.element.addEventListener('touchstart', this.touchStart, { passive: true });
      this.element.classList.add('drawer-active');

    }

  }

  doClose () {

    document.documentElement.classList.remove('drawer-open');

    if (this.element instanceof HTMLElement) {
      this.element.setAttribute('aria-hidden', String(true));
      this.element.classList.remove('drawer-active');
      this.element.removeEventListener('touchstart', this.touchStart);
      this.backdrop.removeEventListener('click', this.doClose);
    }

    this.isOpenValue = false;

    if (this.hasBackdropClass) {
      setTimeout(() => {
        this.backdrop.classList.remove(this.backdropClass);
      }, 300);
    }

  };

  touchStart ({ target }: TouchEvent) {

    if (target instanceof HTMLElement) {

      const { scrollTop, offsetHeight } = target;
      const position = scrollTop + offsetHeight;

      if (scrollTop === 0) {
        target.scrollTop = 1;
      } else if (position === scrollTop) {
        target.scrollTop = scrollTop - 1;
      }
    }
  }

  get transition () {

    const element = document.createElement('div');

    const transitions = {
      transition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };

    for (const transition in transitions) {
      if (element.style[transition] !== undefined) {
        return transitions[transition];
      }
    }

  }

  get buttons () {

    return this.application.element.lastElementChild.querySelectorAll(`[data-drawer="${this.element.id}"]`);

  }

  get backdrop () {

    return document.getElementById('drawer-overlay');

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Stimulus: Whether or not the drawer is opened
   */
  isOpenValue: boolean;
  /**
   * Stimulus: Whether or not the drawer is ready
   */
  isReadyValue: boolean;

  /**
   * Stimulus: Whether or not a backdrop class was provided
   */
  hasBackdropClass: boolean;

  /**
   * Stimulus: The backdrop class value
   */
  backdropClass: string;

}
