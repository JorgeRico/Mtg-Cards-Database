<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div v-html="logo" />

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          Materio
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'dashboard',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Account Settings',
        to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />

    <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />

    <VerticalNavLink
      :item="{
        title: 'Sets',
        to: 'setlist',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Pending Cards',
        to: 'pendingCards',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cards on Decks',
        to: 'cardsOnADeck',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Special Cards',
        to: 'specialSets',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Logos',
        to: 'printLogos',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
  </ul>

</template>

<style lang="scss">

.upgrade-banner {
  margin-top: auto;
}
</style>
