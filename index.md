---
layout: article
titles:
  en: Blog
show_title: false
no-footer-contact: true
---

<style type="text/css">
.describe {
  display: block;
  padding: 10px;
  background: #ECEFF1;
  text-align: justify;
  border-radius: 0.2em;
  font-style: italic;
  line-height: normal;
}
.contact-list {
  list-style: none;
}
.contact-list > li > a {
  display: block;
  margin-bottom: 1em;
}
.contact-list > li > a > img {
  margin-right: 0.5em;
}
</style>

![](assets/images/profile-small.jpg){:.circle .border .shadow .center width="170px" height="170px"}

## He's Abdul Aris

<p class="describe">
Programmer Monkey - Some friends call him 'dul', 'ris' or 'aris', He is a Computer Science Student, focusing on software engineering, very interested in Android Development, using Java & Kotlin as primary programming language, trying to learn more & stay current on those area, have built some apps and/or libraries, published and/or open sourced. Have experienced building a backend service for app using Python (flask), and besides that Machine Learning is an interesting topic he trying to learn.
</p>

## Contacts


<ul class="contact-list">
  {%- assign __locale = site.data.locale.EMAIL_ME -%}
  {%- include snippets/locale-to-string.html -%}
  {%- if site.author.email -%}
  <li>
    <a href="mailto:{{ site.author.email }}"><img src="assets/images/mail.svg"/> {{ __return }}</a>
  </li>
  {%- endif -%}
  {%- assign __locale = site.data.locale.FOLLOW_ME -%}
  {%- include snippets/locale-to-string.html -%}
  {%- if site.author.github -%}
  <li>
    <a href="https://github.com/{{ site.author.github }}"><img src="assets/images/github.svg"/> {{ __return | replace: '[NAME]', 'Github' }}</a>
  </li>
  {%- endif -%}
  {%- if site.author.facebook -%}
  <li>
    <a href="https://www.facebook.com/{{ site.author.facebook }}"><img src="assets/images/facebook.svg"/> {{ __return | replace: '[NAME]', 'Facebook' }}</a>
  </li>
  {%- endif -%}
  {%- if site.author.twitter -%}
  <li>
    <a href="https://twitter.com/{{ site.author.twitter }}">
        {{ __return | replace: '[NAME]', 'Twitter' }}
    </a>
  </li>
  {%- endif -%}
  {%- if site.author.googleplus -%}
  <li>
    <a href="https://plus.google.com/u/0/{{ site.author.googleplus }}">
        {{ __return | replace: '[NAME]', 'Google+' }}
    </a>
  </li>
  {%- endif -%}
  {%- if site.author.linkedin -%}
  <li>
    <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">
        {{ __return | replace: '[NAME]', 'Linkedin' }}
    </a>
  </li>
  {%- endif -%}
</ul>
