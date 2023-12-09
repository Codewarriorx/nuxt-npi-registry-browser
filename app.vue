<script>
  // import 'milligram/dist/milligram.min.css';
  import 'assets/css/main.scss'
  import 'assets/css/header.css';
  import 'assets/css/app.css';
</script>

<template>
  <div>
    <header id="header">
      <span class="nav-heading nav-brand">
        NPI Registry Browser
      </span>

      <input type="checkbox" class="menu-toggle" id="menu-toggle">

      <nav class="header">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <NuxtLink to="https://npiregistry.cms.hhs.gov/search" target="_blank">Registry</NuxtLink>
          </li>
        </ul>
      </nav>

      <label for="menu-toggle" class="menu-nav-toggle">
        <span>  </span>
      </label>
    </header>

    <main class="m-5">
      <NuxtPage />
    </main>

    <footer class="text-center">
      Copyright © 2023 Michael Lauridsen
    </footer>
  </div>
</template>

<style>


</style>