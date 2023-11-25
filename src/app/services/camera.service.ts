import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public imageOptions: CameraOptions = {
    allowEdit: false,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.camera.MediaType.PICTURE,
    destinationType: this.camera.DestinationType.FILE_URI,
  };
  imageTitle = '';
  fileType: any;
  base64Image: string;
  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(
    private camera: Camera,
    private file: File,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage,
    private filePath: FilePath) { }

  chooseFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(this.imageOptions).then(uri => {
        console.log(uri);
        if (uri) {
          this.getImageBase64('file://' + uri).then(imageData => {
            resolve(imageData);
          });
        }
      }).catch(err => {
        reject(err);
      });
    });
  }

  getImageBase64(fileUrl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.filePath.resolveNativePath(fileUrl).then(actualPath => {
        const tempPath: string = actualPath.substr(0, actualPath.lastIndexOf('/') + 1);
        this.imageTitle = actualPath.substr(actualPath.lastIndexOf('/') + 1);
        if (this.imageTitle.indexOf('?') > -1) {
          this.imageTitle = this.imageTitle.substr(0, this.imageTitle.lastIndexOf('?'));
        }
        this.file.readAsDataURL(tempPath, this.imageTitle).then((val) => {
          console.log(val.split(','));
          const tempArr = val.split(',');
          this.fileType = tempArr[0].split(';')[0].split('/')[1];
          console.log(this.fileType);
          resolve(tempArr[1]);
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  async takePhoto(sourceType: number) {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType
    };

    const base64Image = await this.camera.getPicture(options);
    // imageData is either a base64 encoded string or a file URI
    return 'data:image/jpeg;base64,' + base64Image;
  }

  async showSuccesfulUploadAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'Uploaded',
      subHeader: 'Image uploaded successful to Firebase storage',
      message: 'Check Firebase storage.',
      buttons: ['OK']
    });

    await alert.present();
  }

  upload(base64Image): void {
    const currentDate = Date.now();
    const file: any = this.base64ToImage(base64Image);
    const filePath = `Images/${currentDate}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(`Images/${currentDate}`, file);
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(downloadURL => {
          if (downloadURL) {
            this.showSuccesfulUploadAlert();
          }
          console.log(downloadURL);
        });
      })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  savePdf(blob){
    const url = window.URL.createObjectURL(
      new Blob([blob])
    );
    const link = window.document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'test.pdf');
    window.document.body.appendChild(link);
    link.click();
    link.remove();

  }
}
