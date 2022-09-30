<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Dashboard</span>
      <v-spacer></v-spacer>
      <!-- <v-btn icon small class="me-n3 mt-n2">
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn> -->
    </v-card-title>

    <v-card-subtitle class="mb-8 mt-n5">
      <!-- <span class="font-weight-semibold text--primary me-1">Total 48.5% Growth</span> -->
      <span>😎 Virtual Doctor and medicines</span>
    </v-card-subtitle>

    <v-card-text style="padding-bottom:40px;">
      <v-row>
        <!-- <v-col v-for="data in statisticsData" :key="data.title" cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" :color="resolveStatisticsIconVariation (data.title).color" rounded class="elevation-1">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col> -->
        <v-col cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" rounded class="elevation-1 v-avatar success">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation ('caso6').icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              <router-link :to="{ name: 'case-6-anonimize' }" class="dashboardLink">Caso 6 - Anonimización</router-link>
            </h3>
          </div>
        </v-col>
        <v-col cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" rounded class="elevation-1 v-avatar success">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation ('caso6').icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              <router-link :to="{ name: 'case-6-tagger' }" class="dashboardLink">Caso 6 - Tagger</router-link>
            </h3>
          </div>
        </v-col>
        <v-col cols="12" md="12" class="d-flex align-center mt-20 mb-20">
          <v-avatar size="44" rounded class="elevation-1 v-avatar success">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation ('caso7').icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              <router-link :to="{ name: 'case-7' }" class="dashboardLink">Caso 7</router-link>
            </h3>
          </div>
        </v-col>

        <v-col cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" rounded class="elevation-1 v-avatar success">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation ('caso8').icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              <router-link :to="{ name: 'case-8-alarm' }" class="dashboardLink">Caso 8 - Alarmas</router-link>
            </h3>
          </div>
        </v-col>
        <v-col cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" rounded class="elevation-1 v-avatar success">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation ('caso8').icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              <router-link :to="{ name: 'case-8-impact' }" class="dashboardLink">Caso 8 - Petición impacto</router-link>
            </h3>
          </div>
        </v-col>
        <v-col cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" rounded class="elevation-1 v-avatar success">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation ('caso8').icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <h3 class="text-xl font-weight-semibold">
              <router-link :to="{ name: 'case-8-costs' }" class="dashboardLink">Caso 8 - Gestión de costes</router-link>
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline } from '@mdi/js'

export default {
  setup() {
    const statisticsData = [
      {
        total: 'Caso 6 - Anonimización',
      },
      {
        total: 'Caso 6 - Tagger',
      },
      {
        total: 'Caso 7',
      },
      {
        total: 'Caso 8',
      },
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'Sales') return { icon: mdiTrendingUp, color: 'primary' }
      if (data === 'Customers') return { icon: mdiAccountOutline, color: 'success' }
      if (data === 'Product') return { icon: mdiLabelOutline, color: 'warning' }
      if (data === 'Revenue') return { icon: mdiCurrencyUsd, color: 'info' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    return {
      statisticsData,
      resolveStatisticsIconVariation,

      // icons
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiAccountOutline,
        mdiLabelOutline,
        mdiCurrencyUsd,
      },
    }
  },
}
</script>
