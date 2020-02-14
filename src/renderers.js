export const renderInput = (appstate) => {
  const { valid, value } = appstate.form;
  const url = document.getElementById('urlRss');
  const button = document.querySelector('#rssButton');
  if (value === null) {
    url.classList.remove('is-invalid');
    button.disabled = true;
  }
  if (valid) {
    url.classList.add('is-valid');
    url.classList.remove('is-invalid');
    button.disabled = false;
  } else {
    url.classList.add('is-invalid');
    url.classList.remove('is-valid');
    button.disabled = true;
  }
};


export const renderFeeds = (feeds) => {
  const ulFeed = document.querySelector('#channels');
  const channelIdElements = ulFeed.getElementsByTagName('li');
  const channelIds = [];
  [...channelIdElements].forEach((elem) => channelIds.push(elem.getAttribute('id')));
  const channelsToRender = feeds.filter((channel) => !channelIds.includes(channel.feedId));

  channelsToRender.forEach((channel) => {
    const {
      title, description, link, feedId,
    } = channel;
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.setAttribute('id', feedId);
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.textContent = title;
    const p = document.createElement('p');
    p.textContent = description;
    li.append(a);
    li.append(p);
    ulFeed.append(li);
  });
};

export const renderPosts = (posts) => {
  const badgesToRemove = document.getElementsByClassName('badge');
  if (badgesToRemove.length > 0) {
    [...badgesToRemove].forEach((badge) => badge.remove());
  }

  const ulPosts = document.querySelector('#posts');
  const postLinksElements = ulPosts.getElementsByTagName('a');
  const postLinks = [];
  [...postLinksElements].forEach((elem) => postLinks.push(elem.getAttribute('href')));
  console.log('postLinks', postLinks);
  const postsToRender = posts.filter((post) => !postLinks.includes(post.link));
  console.log('filtered', postsToRender);

  postsToRender.forEach((post) => {
    const { title, description, link } = post;
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.innerHTML = `<span class="badge badge-secondary">New</span> ${title}`;
    const p = document.createElement('p');
    p.textContent = description;
    li.append(a);
    li.append(p);
    ulPosts.prepend(li);
  });
};

export const renderNotificationMessage = (state) => {
  const messageDiv = document.querySelector('#message');
  const message = state.form.notification ? `<div class="alert alert-primary role="alert">${state.form.notification}</div>` : null;
  messageDiv.innerHTML = message;
};
