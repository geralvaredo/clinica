import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Imagen} from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {


  private basePath = '/imagenes';
  private uploadTask: firebase.storage.UploadTask;

  constructor() { }

  cargaImagenes( fileToUpload: Imagen, fileName: string): void {
    let logged = false;
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${fileName}`).put(fileToUpload.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
      fileToUpload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      snap.task.then(() => {
        this.uploadTask.snapshot.ref.getDownloadURL()
        .then((url) => {
          if (!logged){
            logged = true;
            fileToUpload.url = `${this.basePath}/${fileName}`;
            return;
          }
        })
        .catch();
      });

    });

  }

  getUpload(url: string): any {
    const storageRef = firebase.storage().ref();
    return storageRef.child(url).getDownloadURL();
  }



}
