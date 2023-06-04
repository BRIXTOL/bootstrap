import relapse from 'relapse';
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

const sidebar = document.querySelector('#sidebar');
const items = Array.from(sidebar.querySelectorAll('a')).map(a => a.id.toLowerCase());

const search: HTMLInputElement = document.querySelector('#search-input');

search.addEventListener('input', function (event) {

  const target = event.target as HTMLInputElement;

  if (target.value) {

    console.log(target.value);
    const hash = items.filter(value => {
      return value.indexOf(target.value) > -1;
    });

    const slug = '#' + hash[0].replace(' ', '-');
    const qs = document.querySelector(slug);
    console.log(qs, slug);
    if (qs) {
      qs.scrollIntoView({ block: 'center' });

    }
  }

});

stickybits('#sidebar');
stickybits('#search', {
  stuckClass: 'mt-5 pt-5'
});

relapse('.relapse', {
  persist: true,
  multiple: true,
  classes: {
    opened: 'is-opened'
  }
});

relapse('#content', {
  persist: true,
  multiple: false
});

const modalButton = document.querySelector('#btn-modal-1');

modalButton.addEventListener('click', () => {

  const m = document.querySelector('#modal-example');

  m.classList.add('is-open');
});
