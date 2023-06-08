import stickybits from 'stickybits';
import { Application } from '@hotwired/stimulus';
import { Accordion } from './views/accordion/controller';
import { Modal } from './views/modal/controller';
import { Dropdown } from './views/dropdown/controller';

const stimulus = Application.start();
const controllers = {
  Accordion,
  Modal,
  Dropdown
};

for (const id in controllers) {
  stimulus.register(id.toLowerCase(), controllers[id]);
}

const cache = 1;

const sidebar = document.querySelector('#sidebar');
const items = Array.from(sidebar.querySelectorAll('a')).map(a => a.id.toLowerCase());

const search: HTMLInputElement = document.querySelector('#search-input');
const anchors: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.anchor');

anchors.forEach((link) => {

  link.onclick = (e) => {

    e.preventDefault();

    anchors.forEach(item => {
      if (item.classList.contains('fw-bold')) {
        item.classList.remove('fw-bold');
      }
    });

    link.classList.add('fw-bold');
    const anchor = document.querySelector('#' + link.href.split('#').pop());

    scrollBy({
      behavior: 'smooth',
      top: anchor.getBoundingClientRect().top - 80
    });

  };

});

// const intersect = new IntersectionObserver(function (entries) {

//   const nav = window.relapse.get('sidebar');
//   const entry = entries[0];
//   const index = +entry.target.getAttribute('data-ref');

//   if (index === cache) {
//     nav.expand(cache);
//   } else {
//     nav.collapse(cache);
//     cache = index;
//   }

// });

// document.querySelectorAll('[data-ref]').forEach(i => intersect.observe(i));

search.addEventListener('input', function (event) {

  const target = event.target as HTMLInputElement;

  if (target.value) {

    console.log(target.value);
    const hash = items.filter(value => {
      return value.indexOf(target.value) > -1;
    });

    const slug = '#' + hash[0].replace(' ', '-');
    const qs = document.querySelector(slug);

    if (qs) {

      scrollBy({
        behavior: 'instant',
        top: qs.getBoundingClientRect().top - 80
      });

    }
  }

});

stickybits('#sidebar');
stickybits('#search');

const modalButton = document.querySelector('#btn-modal-1');

modalButton.addEventListener('click', () => {

  const m = document.querySelector('#modal-example');

  m.classList.add('is-open');
});
