import { Controller } from '@hotwired/stimulus';
import embla, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import qvp from 'qvp';

export class Carousel extends Controller<HTMLElement> {

  /**
   * Stimulus Values
   */
  static values = {
    breakpoint: String,
    align: {
      type: String,
      default: 'start'
    },
    axis: {
      type: String,
      default: 'x'
    },
    dragFree: {
      type: Boolean,
      default: true
    },
    watchDrag: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    skipSnaps: {
      type: Boolean,
      default: false
    },
    containScroll: {
      type: String,
      default: 'keepSnaps'
    },
    startIndex: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 10
    }
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'slideshow',
    'nav'
  ];

  /**
   * Whether or not the carousel should be enabled
   */
  get enabled () {
    return this.hasBreakpointValue ? qvp.test(this.breakpointValue, '|') : true;
  }

  get selector () {
    return this.hasSlideshowTarget ? this.slideshowTarget : this.element;
  }

  /* -------------------------------------------- */
  /* STIMULUS LIFECYCLE                           */
  /* -------------------------------------------- */

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.active = false;

  }

  /**
   * Stimulus Connect
   */
  connect () {

    if (this.enabled && !this.active) this.screen();

  }

  /**
   * Stimulus Disconnect
   */
  disconnect () {

    if (this.active && this.enabled) this.carousel.destroy();

  }

  /* -------------------------------------------- */
  /* METHODS                                      */
  /* -------------------------------------------- */

  private screen () {

    if (!this.active && this.enabled) {

      this.active = true;
      this.carousel = embla(this.selector, {
        align: this.alignValue,
        dragFree: this.dragFreeValue,
        watchDrag: this.watchDragValue,
        skipSnaps: this.skipSnapsValue,
        containScroll: this.containScrollValue,
        duration: this.durationValue,
        startIndex: this.startIndexValue,
        loop: this.loopValue
      });

    } else if (this.active && !this.enabled) {

      this.carousel.destroy();
      this.active = false;
    }

  }

  /* -------------------------------------------- */
  /* STIMULUS EVENTS                              */
  /* -------------------------------------------- */

  /**
   * Carousel - Next
   */
  public next () {

    this.carousel.scrollNext();

  }

  /**
   * Carousel - Previous
   */
  public prev () {

    this.carousel.scrollPrev();

  }

  /**
   * Carousel - Goto
   *
   * Goto Slide
   */
  public goto ({ target }: { target: HTMLButtonElement}) {

    const slide = Number(target.id);

    for (const button of target.parentElement.children) {
      if (button.classList.contains('active')) button.classList.remove('active');
      if (button.id === `${slide}`) {
        button.classList.add('active');
      }
    }

    this.carousel.scrollTo(slide);

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Photoswipe: Template Element
   */
  template: Element;
  /**
   * Carousel Instance
   */
  carousel: EmblaCarouselType;
  /**
   * Stimulus: Whether or not viewer is enabled/disabled
   */
  active: boolean;
  /**
   * HTML Image Element
   */
  image: HTMLImageElement;
  /**
   * Timeout Throttle for navs
   */
  timeout: NodeJS.Timeout = null;

  /* -------------------------------------------- */
  /* STIMULUS VALUES                              */
  /* -------------------------------------------- */

  /**
   * Stimulus: The slideshow target (optional)
   */
  slideshowTarget: HTMLElement;
  /**
   * Stimulus: Whether or not a slideshow target is defined
   */
  hasSlideshowTarget: boolean;
  /**
   * Stimulus: The screen size at which to apply carousel
   */
  breakpointValue: string;
  /**
   * Stimulus: Whether or not a breakpoint size was provided, when `false` runs in any breakpoint.
   */
  hasBreakpointValue: boolean;
  /**
   * Stimulus: whether or not image dimensions have been set
   */
  dimensionsValue: boolean;
  /**
   * Embla carousel `align` option.
   */
  alignValue: EmblaOptionsType['align'];
  /**
   * Embla carousel `speed` option.
   */
  axisValue: 'x' | 'y';
  /**
   * Embla carousel `watchDrag` option.
   */
  watchDragValue: boolean;
  /**
   * Embla carousel `dragFree` option.
   */
  dragFreeValue: boolean;
  /**
   * Embla carousel `loop` option.
   */
  loopValue: boolean;
  /**
   * Embla carousel `skipSnaps` option.
   */
  skipSnapsValue: boolean;
  /**
   * Embla carousel `containScroll` option.
   */
  containScrollValue: 'trimSnaps' | 'keepSnaps';
  /**
   * Embla carousel `startIndex` option.
   */
  startIndexValue: number;
  /**
   * Embla carousel `duration` option.
   */
  durationValue: number;

}
