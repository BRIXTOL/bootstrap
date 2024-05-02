import { Controller } from '@hotwired/stimulus';
import relapse, { Options, Relapse } from 'relapse';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Accordion extends Controller<HTMLElement> {

  /**
   * Stimulus: Values
   */
  static targets = [
    'viewport'
  ];

  /**
   * Stimulus: Values
   */
  static values = {
    multiple: Boolean,
    persist: Boolean,
    id: String
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
      this.hasOpenedClass ||
      this.hasExpandedClass
    );
  }

  /**
   * Stimulus: Initialize
   */
  initialize () {

    this.options = {
      schema: 'data-accordion',
    };

    if (this.hasMultipleValue) this.options.multiple = this.multipleValue;
    if (this.hasPersistValue) this.options.persist = this.persistValue;

    if (this.hasClasses) {

      this.options.classes = {};

      if (this.hasExpandedClass) this.options.classes.expanded = this.expandedClass;
      if (this.hasDisabledClass) this.options.classes.disabled = this.disabledClass;
      if (this.hasOpenedClass) this.options.classes.opened = this.openedClass;
    }

  }

  /**
   * Stimulus: Connect
   */
  connect (): void {

    this.accordion = relapse(this.element, this.options);

  }

  /**
   * Stimulus: Disconnect
   */
  disconnect () {

    this.accordion.destroy();

  }

  /**
   * Open Fold
   *
   * Event target should be the the fold index to open
   */
  open ({ target: { dataset: { index } } }) {

    return this.accordion.folds[parseInt(index)].open();

  }

  /**
   * Close Fold
   *
   * Event target should be the the fold index to close
   */
  close ({ target: { dataset: { index } } }) {

    return this.accordion.folds[parseInt(index)].close();

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Relapse: Instance scope
   */
  accordion: Relapse
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
