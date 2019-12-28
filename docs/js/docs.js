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

    let icon = "<i class='fa fa-" + iconName + "'></i>";

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
