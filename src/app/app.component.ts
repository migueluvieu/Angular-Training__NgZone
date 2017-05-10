import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    progress= 0;
    zona: string;
    color = 'primary';
    mode = 'determinate';
    value = 0;
    bufferValue = 0;

     listItems = [0, 1, 2, 3] ;
     contador= 0;
     interval: number;

    constructor(private _ngZone: NgZone) {}

    // Se realiza proceso dentro de la ngZone, con lo que en cada bucle al actualizarse
    // el campo this.progress, se va actualizando en la vista
    processWithinAngularZone() {
        this.zona = 'dentro';
        this.progress = 0;
        this._increaseProgress(() => console.log('Dentro hecho!'));
    }

    // Se realiza el proceso fuera de la ngZone, con lo que en cada bucle se va actualizando
    // el campo this.progress pero no se va actualizando en la vista al estar fuera.
    // Una vez concluido el proceso se vuelve a sincronizar con la ngZone para bindear this.progress
    // con lo cuál evitamos todos los triggers que están pendientes en la detección de cambios en el dom que Angular2 ejecuta continuamente.
    processOutsideOfAngularZone() {
        this.zona = 'fuera';
        this.progress = 0;
        // runOutsideAngular-> sale de la ngZone para ejecutar el proceso, se ejecutará en paralelo
        this._ngZone.runOutsideAngular(() => {
            this._increaseProgress(() => {
                // esta es la callback que se ejecutará cuando termine. En ese caso volvemos a la ngZone
                this._ngZone.run(() => {
                    console.log('Fuera hecho!' );
                });
            } );
        });
    }

   // método recursivo que incrementa this.progress hasta 100
    private _increaseProgress(doneCallback: () => void) {
        this.progress += 1;
        console.log(`Progreso actual: ${this.progress}%`);
        if (this.progress < 100) {
            window.setTimeout(() => this._increaseProgress(doneCallback), 10)
        }else {
            doneCallback();
        }
    }

    launchCount() {
        if (this.interval) {
            window.clearInterval(this.interval);
        }
        this.interval = window.setInterval(() => {this.contador++;} , 1000);
    }

    enterNgZone () {
        this._ngZone.run (() => this.launchCount());
    }

    exitNgZone () {
        this._ngZone.runOutsideAngular(() => this.launchCount());
    }
}
