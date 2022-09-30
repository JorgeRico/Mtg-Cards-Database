<template>
  <v-card-text id="result" class="invisible">
    <v-col cols="12">
      <v-btn color="primary" class="right me-3 mt-5" @click="downloadAllFiles">Descargar todos los ficheros</v-btn>
    </v-col>
    <v-row v-for="(item, i) in filesList" :key="i" style="width: 100%">
      <v-col cols="12" class="mt-5">
        <h3>
          <u>Fichero:</u> <span class="filename blueviolet">{{ item.name }}</span>
        </h3>
      </v-col>
      <v-col cols="6">
        <h3 class="mb-5">Texto Original</h3>
        <v-textarea outlined rows="12" label="Original" :value=item.original>Texto Original</v-textarea>
      </v-col>
      <v-col cols="6">
        <h3 class="mb-5">Texto Anonimizado</h3>
        <v-textarea outlined rows="12" label="Anonimizado" :id=item.id :value=item.anonimized>Texto
          Anonimizado
        </v-textarea>
        <v-btn color="primary" @click="downloadFile(item.id, item.name)">Descargar fichero
          anonimizado
        </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<style>
.right {
  float: right;
}
</style>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
  props: {
    filesList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    downloadAllFiles() {
      const zip = new JSZip();
      var dateTime = this.getActualTimeString();

      for (var i = 0; i < this.filesList.length; i++) {
        var filename = this.getDownloadFileName(this.filesList[i].name, dateTime);
        zip.file(filename, this.filesList[i].anonimized);
      }

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver.saveAs(content, 'anonimized_files_' + dateTime + '.zip');
      });
    },
    downloadFile(id, filename) {
      var dateTime = this.getActualTimeString();
      var text = this.getDownloadFileText(id);
      filename = this.getDownloadFileName(filename, dateTime);
      var element = document.createElement('a');

      element.setAttribute('href', 'data:application/text;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
    getActualTimeString() {
      var today = new Date();
      var date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
      var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
      var dateTime = date + '_' + time;

      return dateTime;
    },
    getDownloadFileText(id) {
      var element = document.getElementById(id);
      var text = element.value.replace(/(\\r)*\\n/g, '<br>');

      return text;
    },
    getDownloadFileName(filename, dateTime) {
      var filename = 'anonimized_' + filename + '_' + dateTime + '.txt';

      return filename;
    },
  }
}
</script>