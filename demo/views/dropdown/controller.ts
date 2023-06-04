
import { Controller } from '@hotwired/stimulus';
import relapse from 'relapse';

/* -------------------------------------------- */
/* INTERFACE                                    */
/* -------------------------------------------- */

/**
 * Dropdown
 *
 * Facilitates Dropdown/Collapsible functionality.
 */
export class Dropdown extends Controller {

  /**
   * Public Attributes - Consumed by components
   */
  static public = {
    contoller: {
      'data-controller': 'dropdown',
      'data-dropdown-active-class': 'active',
      'data-dropdown-collapse-value': 'closed',
      'data-dropdown-selected-class': 'selected'
    },
    button: {
      'data-action': 'click->dropdown#toggle',
      'data-dropdown-target': 'button'
    }
  };

  /**
   * Stimulus Values
   */
  static values = {
    selected: String,
    form: String,
    required: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: String,
      default: 'closed'
    },
    type: {
      type: String,
      default: 'dropdown'
    }
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'list',
    'button',
    'placeholder',
    'input',
    'viewport'
  ];

  /**
   * Stimulus Classes
   *
   * @static
   * @memberof Dropdown
   */
  static classes = [
    'selected',
    'disabled',
    'invalid'
  ];

  /**
   * Stimulus Initialize
   *
   * @static
   * @memberof Dropdown
   */
  connect () {

    this.isFormSelect = this.element.hasAttribute('data-form-target');

  }

  /**
   * Stimulus Disconnect
   *
   * @static
   * @memberof Dropdown
   * @version 2.0
   */
  disconnect () {

    //

  }

  inViewport () {

    const rect = this.viewportTarget.getBoundingClientRect();

    for (const { element, folds } of relapse.get().values()) {
      if (element.id === 'product-description') {

        if (!(
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )) {
          folds.find(fold => fold.expanded === true).close();
        }

        break;
      }
    }

  }

  /**
   * Toggle - Open/Close
   */
  toggle (event: Event) {

    event.stopPropagation();

    if (this.element.classList.contains('opened')) return this.close();

    this.collapseValue = 'opened';
    this.element.classList.add('opened');
    this.buttonTarget.classList.remove('selected');

    if (this.hasViewportTarget) this.inViewport();

    // listen for outside clicks
    addEventListener('click', this.outsideClick.bind(this));

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick (event: Event) {

    if (this.buttonTarget !== event.target) {
      if (this.element.classList.contains('opened')) {
        this.close();
      }
    }

  }

  /**
   * Close Dropdown
   */
  close () {

    this.element.classList.remove('opened');

    if (this.collapseValue === 'selected' || this.hasSelectedValue) {
      this.element.classList.add('selected');
    } else {
      this.collapseValue = 'closed';
    }

    removeEventListener('click', this.outsideClick);

  }

  /**
   * Select Inputs
   *
   * Used for Dropdown Forms
   */
  select ({ target }: { target: HTMLInputElement }) {

    this.selectedValue = target.value;
    this.buttonTarget.innerText = target.ariaLabel;
    this.collapseValue = 'selected';
    this.close();

  }

  /**
   * Items in dropdown - An ul > li <select> element equivelent
   */
  options (event: MouseEvent) {

    if (event.target instanceof HTMLElement) {

      if (event.currentTarget instanceof HTMLElement) {
        const [ selected ] = event.currentTarget.getElementsByClassName('selected');
        if (selected) this.selectedValue = selected.id; // the <span> text
      }
      if (event.currentTarget instanceof HTMLElement) {
        console.log(event.currentTarget);
      }

      if (this.hasRequiredValue) {

        if (this.buttonTarget.classList.contains('is-invalid')) {
          this.buttonTarget.classList.remove('is-invalid');
        }

        this.requiredValue = false;
        this.buttonTarget.classList.add('selected');
      }

      this.selectedValue = event.target.textContent;
      this.buttonTarget.textContent = event.target.textContent;
      this.collapseValue = 'selected';

      // if (this.isFormSelect) this.inputTarget.value = this.selectedValue;

      this.toggle(event);

    }
  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Stimulus: The button element which when clicked shows dropdown list
   */
  buttonTarget: HTMLElement;

  /**
   * Stimulus: The placeholder element within the button - applies selected value
   */
  placeholderTarget: HTMLElement;

  /**
   * Stimulus: The input element containing the selected value
   */
  inputTarget: HTMLInputElement;

  /**
   * Stimulus: The input element containing the selected value
   */
  viewportTarget: HTMLElement;

  /**
   * Stimulus: The input element containing the selected value
   */
  hasViewportTarget: HTMLElement;

  /**
   * Stimulus: The input element containing the selected value
   */
  hasInputTarget: boolean;

  /**
   * Stimulus: The collpase element which contains the list items
   */
  collapseTarget: HTMLElement;

  /**
   * Stimulus: Whether or not a collapse state was provided
   */
  hasCollpaseValue: boolean;

  /**
   * Stimulus: The current state of the dropdown, defaults to `closed`
   */
  collapseValue: 'opened' | 'closed' | 'selected';

  /**
   * Stimulus: Dropdown is being used a form select
   */
  isFormSelect: boolean;
  /**
   * Stimulus: Whether or not a form identifier was provided
   */
  hasFormValue: boolean;
  /**
   * Stimulus: Whether or selection is required - Typically used in forms
   */
  requiredValue: boolean;
  /**
   * Stimulus: Whether or not the dropdown has a required value
   */
  hasRequiredValue: boolean;
  /**
   * Stimulus: Whether or not type value exists - Defaults to `dropdown` is undefined
   */
  hasTypeValue: boolean;

  /**
   * Stimulus: The current selected list item value in the dropdown list
   */
  selectedValue: string;

  /**
   * Stimulus: Whether or not a list item was selected
   */
  hasSelectedValue: boolean;

  /* -------------------------------------------- */
  /* CLASSES                                      */
  /* -------------------------------------------- */

  /**
   * Stimulus: The `active` class which will open the dropdown
   */
  openedClass: string;
  /**
   * Stimulus: The `disabled` class to be applied to dropdown items
   */
  disabledClass: string;
  /**
   * Stimulus: Whether or not `disabledClass` was passed
   */
  hasDisabledClass: boolean;
  /**
   * Stimulus: The `selected` class to be applied to when an item was chosen
   */
  selectedClass: string;
  /**
   * Stimulus: Whether or not `selected` class was passed
   */
  hasSelectedClass: boolean;
  /**
   * Stimulus: The `selected` class to be applied to when an item was chosen
   */
  invalidClass: string;
  /**
    * Stimulus: Whether or not `required` class was passed
    */
  hasInvalidClass: boolean;

}
