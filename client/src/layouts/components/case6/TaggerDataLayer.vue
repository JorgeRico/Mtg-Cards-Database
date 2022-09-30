<template>
  <v-card-text id="result" class="invisible">
    <v-btn color="primary" class="right me-3 mt-5" @click="downloadFile">Descargar ficheros utilizados</v-btn>
    <v-row v-for="(item, i) in filesList" :key="i" style="width: 100%;">
      <v-col cols="12" class="mt-5">
        <div v-html="item.HTML"></div>
      </v-col>
      <v-col cols="12" class="mt-5">
        <h2 class="mb-5">Leyenda</h2>
        <v-row v-for="(itemEtiqueta, j) in item.Etiquetas" :key="j">
          <h3><sup>{{ j+1 }}</sup> {{ itemEtiqueta.expression }} </h3>
          <p class="mt-1 ml-3 mb-0"><strong>Grupo: </strong> {{ itemEtiqueta.type[0].group }}</p>
          <p class="mt-1 ml-3 mb-0"><strong>Subgrupo: </strong> {{ itemEtiqueta.type[0].subgroup }}</p>
          <p class="mt-1 ml-3 mb-0"><strong>Probabilidad: </strong> {{ itemEtiqueta.probability }}</p>
          <p class="mt-1 ml-3 mb-0"><strong>Etiquetas: </strong></p>
          <v-col cols="12" v-for="(itemLabel, z) in itemEtiqueta.labels" :key="z">
            <p class="mt-0 ml-5 mb-0"><strong>Terminología: </strong> {{ itemLabel.terminology }}</p>
            <p class="mt--10 ml-5 mb-0"><strong>Código: </strong> {{ itemLabel.code }}</p>
            <p class="mt--10 ml-5 mb-0"><strong>Idioma: </strong>
              <span v-if="itemLabel.language == spanish">ES</span>
              <span v-else>EN</span>
            </p>
            <p class="mt--10 ml-5 mb-0"><strong>Términos: </strong>
            <ul>
              <li v-for="(itemTerms, y) in itemLabel.terms" :key="y">
                {{ itemTerms }}
              </li>
            </ul>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<style>
p {
  width: 100%;
}

.mt--13 {
  margin-top: -13px;
}

.right {
  float: right;
}
</style>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
  data() {
    return {
      'spanish': 'SPA'
    }
  },
  props: {
    filesList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    downloadFile() {
      const zip = new JSZip();
      var dateTime = this.getActualTimeString();

      for (var i = 0; i < this.filesList.length; i++) {
        var filename = this.getDownloadFileName('index', dateTime);
        zip.file(filename + '.html', this.filesList[i].HTML);
        zip.file(filename + '_informe.txt', this.filesList[i].Informe);
        zip.file(filename + '_etiquetas.txt', JSON.stringify(this.filesList[i].Etiquetas));
      }

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver.saveAs(content, 'tagger_files_' + dateTime + '.zip');
      });
    },
    getActualTimeString() {
      var today = new Date();
      var date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
      var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
      var dateTime = date + '_' + time;

      return dateTime;
    },
    getDownloadFileName(filename, dateTime) {
      var filename = 'tagged' + filename + '_' + dateTime;

      return filename;
    },
  }
}
</script>