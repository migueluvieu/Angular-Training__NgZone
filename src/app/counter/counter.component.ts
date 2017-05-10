
import { Component, NgZone } from '@angular/core';
@Component({
  selector: 'zone-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

     contador= 0;
     interval: number;
     zone = 'dentro';
    constructor(private _ngZone: NgZone) {}

    /**
     * Función que lanza el contador. Incrementa campo cada seg
     * @memberOf CounterComponent
     */
    init() {
        // Limpia interval activo
        window.clearInterval(this.interval);
        this.interval = window.setInterval(() => {this.contador++; } , 500);
    }

    /**
     * Mete en la ngZone la función contador, con lo que se renderizará, el ctrol de cambios del ctx actuará
     * el campo en la  vista cada ciclo.
     * @memberOf CounterComponent
     */
    enterNgZone () {
        this.zone = 'dentro';
        this._ngZone.run (() => this.init());
    }

   /**
     * Saca de la ngZone la función contador, con lo que ya no se renderizará
     * el campo en la  vista cada ciclo. No obstante la vble se sigue incrementando.
     * Al volver a entrar en la zona se hará un binding del valor actual del contador a
     * la vista
     * @memberOf CounterComponent
     */
    exitNgZone () {
        this.zone = 'fuera';
        this._ngZone.runOutsideAngular(() => this.init());
    }

     /**
     * Finaliza el intervalo
     * @memberOf CounterComponent
     */
    stop () {
        this.zone = 'dentro';
        window.clearInterval(this.interval);
        this.contador = 0;
    }
}

