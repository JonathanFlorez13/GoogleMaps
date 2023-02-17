import { Component, OnInit } from '@angular/core';
import { faT, faTruckMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  map: any;
  bounds = new google.maps.LatLngBounds();
  activateDrawing = false;
  //center!: google.maps.LatLngLiteral;
  center = { lat: 4.8296307, lng: -74.3524358 };
  destination = { lat: 4.809642626264577, lng: -74.35132131283089 };
  //directionsService = new google.maps.DirectionsService();
  //directionsRenderer = new google.maps.DirectionsRenderer();
  //directionsRendererOptions = new google.maps.DirectionsRendererOptions()

  path = [
    { lat: 4.820363056598254, lng: -74.34859564898923 },
    { lat: 4.82030464628511, lng: -74.3594371681523 },
    { lat: 4.81199729194192, lng: -74.35619215208985 },
  ];

  count = 0;
  marcadorAmbulance!: google.maps.Marker;

  ngOnInit() {
    this.createMap();
  }

  createMap() {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 15,
        center: this.center,
        mapId: '9c31354727602435',
      }
    );
    //this.map.setClickable(false)

    this.calculateRoute(this.map);
  }

  ambulance() {
    const iconMarker = {
      path: faTruckMedical.icon[4] as string,
      fillColor: '#0000ff',
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faTruckMedical.icon[0] / 2, // width
        faTruckMedical.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 0.07,
    };

    const svgMarker = {
      path: 'M24.37,10.14c0-.81-.3-1.49-.87-2.07-1.82-1.81-3.64-3.63-5.46-5.45-.29-.29-.62-.52-1-.66-.06-.03-.13-.13-.14-.19-.01-.34,0-.68,0-1.02,0-.53-.22-.75-.74-.75h-2.31c-.58,0-.79,.21-.79,.78V1.85H1.99c-.13,0-.25,0-.38,.01-.36,.02-.68,.16-.96,.37-.36,.28-.53,.68-.65,1.1V14.14c.17,.34,.45,.45,.82,.43,.43-.02,.87,0,1.29,0,.4,1.24,1.2,1.99,2.49,2.02,1.38,.04,2.23-.73,2.66-2.01h10.05c.03,.07,.05,.13,.07,.19,.35,1.09,1.34,1.82,2.48,1.84,1.11,.02,2.16-.74,2.5-1.82,.04-.14,.08-.24,.25-.26,.98-.1,1.77-.96,1.76-2.05,0-.78,0-1.55,0-2.33ZM4.68,15.42c-.8,0-1.45-.66-1.44-1.46,0-.8,.68-1.46,1.47-1.44,.79,.02,1.43,.67,1.44,1.45,0,.79-.67,1.45-1.46,1.45ZM7.7,6.95c0,.38-.24,.62-.62,.63-.29,.01-.59,0-.92,0,0,.31,0,.59,0,.86,0,.45-.24,.68-.69,.69-.32,0-.65,0-.97,0-.39,0-.63-.25-.64-.65,0-.28,0-.55,0-.83,0,0,0-.02-.02-.07h-.73c-.59,0-.78-.2-.78-.78,0-.3,0-.6,0-.9,0-.38,.25-.61,.63-.62,.28,0,.55,0,.83,0,.01,0,.03-.01,.07-.03,0-.28,0-.57,0-.86,0-.4,.23-.64,.63-.65,.35,0,.7,0,1.04,0,.39,0,.62,.24,.63,.63,0,.29,0,.59,0,.91,.3,0,.58,0,.86,0,.44,0,.68,.24,.68,.67,0,.33,0,.67,0,1ZM14.25,1.2h1.46v.63h-1.46v-.63Zm2.95,6.37c-.73,0-1.46,0-2.19,0-.47,0-.67-.19-.67-.65,0-.83,0-1.66,0-2.5,0-.33,.09-.42,.42-.42,.55,0,1.09,0,1.64,0,.24,0,.43,.07,.6,.24,.91,.91,1.81,1.82,2.72,2.72,.12,.12,.21,.24,.13,.42-.08,.18-.23,.2-.39,.2-.75,0-1.51,0-2.26,0Zm2.68,7.85c-.8,0-1.46-.65-1.46-1.45s.67-1.46,1.46-1.45c.78,0,1.44,.66,1.45,1.44,0,.79-.65,1.46-1.45,1.46Z',
      fillColor: 'blue',
      fillOpacity: 0.8,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(15, 30),
    };

    this.marcadorAmbulance.setMap(null);

    this.marcadorAmbulance = new google.maps.Marker({
      position: this.path[this.count],
      map: this.map,
      title: 'Ambulance',
      icon: iconMarker,
      animation: google.maps.Animation.BOUNCE,
    });
    
    let centro:google.maps.LatLng = new google.maps.LatLng(this.path[this.count])

    this.bounds.extend(this.path[this.count])
    this.map.setCenter(new google.maps.LatLng(this.path[this.count]))
    this.map.setZoom(16)


    if (this.count < this.path.length - 1) {
      this.count += 1;
    } else {
      this.count = 0;
    }
  }

  positionAmbulance() {
    console.log(this.count);
    if (this.count < this.path.length) {
      this.count += 1;
      return this.path[this.count];
    } else {
      this.count = -1;
      return this.path[this.count];
    }
  }

  calculateRoute(map: any) {
    let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    this.marcadorAmbulance = new google.maps.Marker({
      position: this.center,
      map: map,
      title: 'CASA',
      icon: "",
    });

    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: 'blue',
      fillOpacity: 0.8,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(15, 30),
    };

    let home = new google.maps.Marker({
      position: this.center,
      map: this.map,
      title: 'Ambulance',
      icon: svgMarker,
      animation: google.maps.Animation.BOUNCE,
    });

    //this.directionsRenderer.setMap(map);

    // this.directionsService.route(
    //   {
    //     origin: this.center,
    //     destination: this.destination,
    //     travelMode: google.maps.TravelMode.DRIVING,
    //     drivingOptions: {
    //       departureTime: new Date(Date.now()),
    //       trafficModel: google.maps.TrafficModel.OPTIMISTIC,
    //     },
    //   },
    //   (response, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       this.directionsRenderer.setDirections(response);
    //     } else {
    //       alert('Could not display directions due to: ' + status);
    //     }
    //   }
    //;)
    
  }

  drawingTool() {
    this.activateDrawing = true;
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: this.activateDrawing,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      markerOptions: {
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    });

    drawingManager.setMap(this.map);
  }

  geolocation() {
    const infoWindow = new google.maps.InfoWindow();

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(this.map);
        this.map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, this.map.getCenter()!);
      }
    );
  }
}

function handleLocationError(
  arg0: boolean,
  infoWindow: google.maps.InfoWindow,
  arg2: any
) {
  throw new Error('Function not implemented.');
}
