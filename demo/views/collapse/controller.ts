import { Controller } from '@hotwired/stimulus';
import relapse, { Scope, Options } from 'relapse';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Collapse extends Controller<HTMLElement> {

  /**
   * Stimulus: Values
   */
  static values = {
    id: String,
    multiple: {
      type: Boolean,
      default: true
    },
    persist: {
      type: Boolean,
      default: false
    }
  };

  /**
   * Stimulus: Classes
   */
  static classes = [
    'disabled',
    'expanded',
    'focused',
    'initial',
    'opened'
  ];

  get hasClasses () {
    return (
      this.hasDisabledClass ||
      this.hasFocusedClass ||
      this.hasInitialClass ||
      this.hasOpenedClass ||
      this.hasExpandedClass
    );
  }

  /**
   * Stimulus: Initialize
   */
  initialize () {

    this.options = {
      duration: NaN
    };

    if (this.hasMultipleValue) this.options.multiple = this.multipleValue;
    if (this.hasPersistValue) this.options.persist = this.persistValue;

    if (this.hasClasses) {

      this.options.classes = {};

      if (this.hasFocusedClass) this.options.classes.focused = this.focusedClass;
      if (this.hasInitialClass) this.options.classes.initial = this.initialClass;
      if (this.hasExpandedClass) this.options.classes.expanded = this.expandedClass;
      if (this.hasDisabledClass) this.options.classes.disabled = this.disabledClass;
      if (this.hasOpenedClass) this.options.classes.opened = this.openedClass;
    }

  }

  /**
   * Stimulus: Connect
   */
  connect (): void {

    this.collapse = relapse(this.element, this.options);

  }

  /**
   * Stimulus: Disconnect
   */
  disconnect () {

    this.collapse.destroy();

  }

  /**
   * Open Fold
   *
   * Event target should be the the fold index to open
   */
  open ({ target: { dataset: { index } } }) {

    return this.collapse.folds[parseInt(index)].open();

  }

  /**
   * Close Fold
   *
   * Event target should be the the fold index to close
   */
  close ({ target: { dataset: { index } } }) {

    return this.collapse.folds[parseInt(index)].close();

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Relapse: Instance scope
   */
  collapse: Scope;
  /**
   * Relapse: Options
   */
  options: Options;
  /**
   * Stimulus: Whether or not multiple folds can be expanded.
   */
  multipleValue: boolean;
  /**
   * Stimulus:  Whether or not `multipleValue` value was passed
   */
  hasMultipleValue: boolean;
  /**
   * Stimulus: Whether or not to persist a fold.
   */
  persistValue: boolean;
  /**
   * Stimulus:  Whether or not `persistValue` value was passed
   */
  hasPersistValue: boolean;

  /**
   * Stimulus: Whether or not `viewportTarget` exists
   */
  hasViewportTarget: boolean;

  /**
   * Stimulus: The `viewportTarget` element to check
   */
  viewportTarget: HTMLElement;

  /* -------------------------------------------- */
  /* TYPE CLASSES                                 */
  /* -------------------------------------------- */

  /**
   * Stimulus: The disabled class to be applied to relapse
   */
  disabledClass: string;
  /**
    * Stimulus: Whether or not `disabledClass` was passed
    */
  hasDisabledClass: boolean;
  /**
    * Stimulus: The `focused` to be applied to relapse
    */
  focusedClass: string;
  /**
    * Stimulus: Whether or not `focusedClass` was passed
    */
  hasFocusedClass: boolean;
  /**
    * Stimulus: The `initial` to be applied to relapse
    */
  initialClass: string;
  /**
    * Stimulus: Whether or not `initialClass` was passed
    */
  hasInitialClass: boolean;
  /**
    * Stimulus: The `opened` to be applied to relapse
    */
  openedClass: string;
  /**
    * Stimulus: Whether or not `openedClass` was passed
    */
  hasOpenedClass: boolean;
  /**
    * Stimulus: The `opened` to be applied to relapse
    */
  expandedClass: string;
  /**
    * Stimulus: Whether or not `expandedClass` was passed
    */
  hasExpandedClass: boolean;

}
