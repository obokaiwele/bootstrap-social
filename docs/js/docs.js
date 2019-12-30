const brands = {
  adn: 'App.net',
  amazon: 'Amazon',
  apple: 'Apple',
  bitbucket: 'Bitbucket',
  dropbox: 'Dropbox',
  facebook: 'Facebook',
  flickr: 'Flickr',
  foursquare: 'Foursquare',
  github: 'GitHub',
  google: 'Google',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  microsoft: 'Microsoft',
  odnoklassniki: 'Odnoklassniki',
  openid: 'OpenID',
  pinterest: 'Pinterest',
  reddit: 'Reddit',
  soundcloud: 'SoundCloud',
  'stack-exchange': 'StackExchange',
  tumblr: 'Tumblr',
  twitter: 'Twitter',
  vimeo: 'Vimeo',
  vk: 'VKontakte',
  yahoo: 'Yahoo!'
}

const buttonSizes = ['btn-lg', undefined, 'btn-sm']
const groupSizes = ['btn-group-lg', undefined, 'btn-group-sm']

let oldBrand = '';

/**
 * Reference: https://github.com/sindresorhus/rgb-hex/blob/master/index.js
 */
function rgbToHex(red, green, blue, alpha) {
  const isPercent = (red + (alpha || '')).toString().includes('%');
  
  if (typeof red === 'string') {
    [red, green, blue, alpha] = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
  } else if (alpha !== undefined) {
    alpha = parseFloat(alpha);
  }
  
  if (typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255
  ) {
      throw new TypeError('Expected three numbers below 256');
  }
  
  if (typeof alpha === 'number') {
    if (!isPercent && alpha >= 0 && alpha <= 1) {
      alpha = Math.round(255 * alpha);
    } else if (isPercent && alpha >= 0 && alpha <= 100) {
      alpha = Math.round(255 * alpha / 100);
    } else {
      throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
    }
  
    alpha = (alpha | 1 << 8).toString(16).slice(1);
  } else {
    alpha = '';
  }
  
  const hex = ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
  return '#' + hex.toUpperCase();
}

function randomKeyValue(obj) {
  const keys = Object.keys(obj);
  const key = keys[keys.length * Math.random() << 0];
  return [key, obj[key]];
}

function addButtonGroup($parent, size, ...$buttons) {
  const $group = $('<div>').addClass('btn-group btn-block');
  if ( size ) {
    $group.addClass(size);
  }
  for (const $button of $buttons) {
    $group.append($button);
  }
  $parent.append($group);
}

function createSocialButton(brand, label, size) {
  const $a = $('<a>').addClass('text-left btn btn-block btn-' + brand);
  if ( size ) {
    $a.addClass(size);
  }
  const $i = $('<i>').addClass('fab fa-' + brand);
  $a.append($i);
  $a.text(' Sign in with ' + label);
  return $a;
}

function addSocialButton($parent, brand, label, size) {
  const $button = createSocialButton(brand, label, size);
  $parent.append($button);
}

function addSocialHex($parent, brand, hex) {
  const $code = $('<code>').text('btn-' + brand);
  const $span = $('<span>').addClass('social-hex').text(hex);
  const $li = $('<li>');
  $li.append($code).append(' ').append($span);
  $parent.append($li);
}

function createSocialIcon(brand, size, ...margins) {
  if ( margins.length > 0 ) {
    margins = margins[0].join(' ')
  } else {
    margins = ''
  }
  const $a = $('<a>').addClass('btn btn-' + brand + ' ' + margins);
  if ( size ) {
    $a.addClass(size);
  }
  const $i = $('<i>').addClass('fab fa-' + brand);
  $a.append($i);
  return $a;
}

function addSocialIcon($parent, brand, size, ...margins) {
  const $icon = createSocialIcon(brand, size, margins);
  $parent.append($icon);
}

function initSocialButtons($parent, brands) {
  for ( const [brand, label] of Object.entries(brands) ) {
    const $button = createSocialButton(brand, label);
    const $icon = createSocialIcon(brand);
    addButtonGroup($parent, undefined, $icon, $button);
  }
}

function initSocialIcons($parent, brands) {
  for ( const brand of Object.keys(brands) ) {
    addSocialIcon($parent, brand, undefined, 'mr-1', 'mb-1');
  }
}

function initSocialHexes($parent, brands) {
  // Temporary element to get hex for specific brand's color
  const $a = $('<a>').hide();
  $parent.append($a);

  for ( const brand of Object.keys(brands) ) {
    $a.addClass('btn-' + brand);
    const rgbColor = $a.css('background-color');
    const hexColor = rgbToHex(rgbColor);
    addSocialHex($parent, brand, hexColor);
  }

  $a.remove();
}

function initSocialSizesButtons($parent, brand, label, sizes) {
  for ( const size of sizes ) {
    const $button = createSocialButton(brand, label);
    const $icon = createSocialIcon(brand);
    addButtonGroup($parent, size, $icon, $button);
  }
}

function initSocialSizesIcons($parent, brand, sizes) {
  for ( const size of sizes ) {
    addSocialIcon($parent, brand, size, 'mr-1', 'mb-1');
  }
}

function updateSizesButton($button, oldBrand, newBrand, label) {
  $button.removeClass(oldBrand);
  $button.addClass(newBrand);
  $button.each((index, element) => {
    const $element = $(element);
    if ( $element.text().includes('Sign in with') ) {
      $element.text('Sign in with ' + label)
    } 
  });

  const $icon = $button.find('i');
  $icon.removeClass(oldBrand.replace('btn-', 'fa-'));
  $icon.addClass(newBrand.replace('btn-', 'fa-'));
}

function updateSizesButtons(brands, $socialClass, ...$buttons) {
  $socialClass.mouseenter((event) => {
    const newBrand = $(event.target).text();
    const brand = newBrand.replace('btn-', '');
    const label = brands[brand];

    for ( const $button of $buttons ) {
      updateSizesButton($button, oldBrand, newBrand, label);
    }

    oldBrand = newBrand;
  });
}

$(function() {
  const $socialButtons = $('#social-buttons');
  initSocialButtons($socialButtons, brands);

  const $socialIcons = $('#social-icons');
  initSocialIcons($socialIcons, brands);

  const $socialHexes = $('#social-hexes');
  initSocialHexes($socialHexes, brands);

  const $socialSizesButtons = $('#social-sizes-buttons');
  const [brand, label] = randomKeyValue(brands);
  oldBrand = 'btn-' + brand;
  initSocialSizesButtons($socialSizesButtons, brand, label, groupSizes);

  const $socialSizesIcons = $('#social-sizes-icons');
  initSocialSizesIcons($socialSizesIcons, brand, buttonSizes);

  const $socialClass = $('#social-hexes code');
  const $socialButton = $('#social-sizes-buttons a');
  const $socialIcon = $('#social-sizes-icons a');
  updateSizesButtons(brands, $socialClass, $socialButton, $socialIcon);
})


$(function () {
  let allClasses = [];
  let $socialClass = $('.social-class li');
  let $sizesButton = $('.social-sizes a.btn-block');
  let $socialButton = $('.social-sizes .btn');
  let $socialIcon = $('.social-sizes .btn-social-icon');

  $socialClass.each((index, element) => {
    allClasses.push('btn-' + $(element).data('code'));
  });
  addClasses = allClasses.join(' ');

  $socialClass.mouseenter((event) => {
    const $target = $(event.target);
    const iconName = $target.data('icon') || $target.data('code');
    if ( ! iconName ) {
        return;
    }

    let icon = "<i class='fab fa-" + iconName + "'></i>";

    let targetName = $target.data('name');
    if ( ! targetName ) {
        console.log($target);
    }
    $sizesButton.html(icon + ' Sign in with ' + targetName);

    $socialIcon.html(icon);
    $socialButton.removeClass(allClasses);
    $socialButton.addClass('btn-' + $target.data('code'));
  });

  // Initialize to a random selection
  const index = Math.floor($socialClass.length * Math.random());
  $( $socialClass[index] ).mouseenter();
});
