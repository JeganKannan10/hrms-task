$(document).on('change','#city', function(){
    if(($("#city_ploygon").data('id')) == 2) {
        $.ajax({
            type: 'POST',
            url: getCityPolygons,
            data: {
                id: $(this).val(),
            },
            success: function (response) {
                console.log('city-based-polygons',response.data.cityPolygon);
                if(response.data.cityPolygon != 0) {
                    $('#city_ploygon').show()
                    $('#city_ploygon').empty()
                    $('#city_ploygon').append(response.data.cityPolygon);
                    initAutocomplete()
                }else {
                    $('#city_ploygon').hide()
                }
            }
        });
    }
})

document.addEventListener('DOMContentLoaded', function () {
    var active = document.activeElement;
    google.maps.event.addDomListener(window, "load", initAutocomplete);
});

function initAutocomplete() {   
    var value = $("#geofence_latlng").val();
    var value1 = $("#city_geofence_latlng").val();

    var lat = $("#latitude").val();
    var lng = $("#longitude").val();
            
    mapnew = new google.maps.Map(document.getElementById('map_polygon'), {
        zoom: 11,
        center: new google.maps.LatLng(lat, lng),
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        noClear:true
    });

    var citylat = $("#city_latitude").val();
    var citylng = $("#city_longitude").val();
    var cityPolygon = $("#city_map_polygon").val()
    if(cityPolygon != null) {
        citymapnew = new google.maps.Map(document.getElementById('city_map_polygon'), {
            zoom: 10,
            center: new google.maps.LatLng(citylat, citylng),
            noClear:true
        });
    }
    var polyOptions = {
        strokeWeight: 3,
        fillOpacity: 0.2
    };
    var tempLat = [];
    var temp_arr = [];
    var latArray = [];
    var shapes={
        collection:{},
        selectedShape:null,
        add:function(e){
        var shape=e.overlay,
            that=this;              
        shape.type=e.type;
        shape.id=new Date().getTime()+'_'+Math.floor(Math.random()*1000);
        this.collection[shape.id]=shape;
        this.setSelection(shape);
        google.maps.event.addListener(shape,'click',function(){
            that.setSelection(this);
        });            
        google.maps.event.addListener(shape.getPath(), 'set_at', function() {
    
    
            shapes.save();
        });
        google.maps.event.addListener(shape.getPath(), 'insert_at', function() {
            shapes.save();
        });            
        shapes.save();
        },
        setSelection:function(shape){
        if(this.selectedShape!==shape){
            this.clearSelection();
            this.selectedShape = shape;
            shape.set('draggable',true);
            shape.set('editable',true);
        }
        },
        deleteSelected:function(){
        
        if(this.selectedShape){
            var shape= this.selectedShape;
            this.clearSelection();
            shape.setMap(null);
            delete this.collection[shape.id];
            shapes.save();
            $("#geofence_latlng").val("");
        }
        },
        
        
        clearSelection:function(){
        if(this.selectedShape){
            this.selectedShape.set('draggable',false);
            this.selectedShape.set('editable',false);
            this.selectedShape=null;
        }
        },
        save:function(){
        var collection=[];
        for(var k in this.collection){
            var shape=this.collection[k],
                types=google.maps.drawing.OverlayType;
            console.log('shape ::',shape.getPath().getArray())
            switch(shape.type){
            case types.POLYGON:
                var locations = shape.getPath().getArray();
                locations.forEach(this.mkArray);
                temp_arr.push(temp_arr[0]);
                console.log(temp_arr);
                latArray.push(temp_arr);
                collection.push(latArray);
                temp_arr =[] ; latArray = [];
                break;
            default:
            }
        }
        //collection is the result
        console.log('collectionsss :', collection)
        console.log('temp_arr      :: :', temp_arr)
        $("#geofence_latlng").val(JSON.stringify(collection))
        },
        mkArray:function(item,index){
        tempLat.push(item.lng());
        tempLat.push(item.lat());
        temp_arr.push(tempLat);
        tempLat = [];
        },
        newPolyLine:function(polyOptions){
        var polyLine = new google.maps.Polyline(polyOptions);
        polyLine.setMap(mapnew);
        google.maps.event.addListener(polyLine, 'click', function (event) {
            shapes.setSelection(polyLine);
        });  
        var overlay = {
            overlay: polyLine, 
            type: google.maps.drawing.OverlayType.POLYGON
        };
        return overlay;
        },
        newPolyOptions:function(path){
            return new google.maps.Polygon({
                path:path,
                fillOpacity:0.5,
                clickable:true,
                draggable: true
            });
        },
        mapToLatLng:function(source, index, array){
            return new google.maps.LatLng(parseFloat(source[1]), parseFloat(source[0]));
        },
        toLatLng:function(array){
            return array.map(this.mapToLatLng);
        }
    };

    var shapes1={
        collection:{},
        selectedShape:null,
        add:function(e){
          var shape1=e.overlay,
              that=this;              
          shape1.type=e.type;
          shape1.id=new Date().getTime()+'_'+Math.floor(Math.random()*1000);
          this.collection[shape1.id]=shape1;           
          google.maps.event.addListener(shape1.getPath(), 'set_at', function() {
            shapes1.save();
          });
          google.maps.event.addListener(shape1.getPath(), 'insert_at', function() {
            shapes1.save();
          });            
          shapes1.save();
        },
        save:function(){
          var collection=[];
          for(var k in this.collection){
            var shape=this.collection[k],
                types=google.maps.drawing.OverlayType;
            switch(shape.type){
              case types.POLYGON:
                  var locations = shape.getPath().getArray();
                  locations.forEach(this.mkArray);
                  temp_arr.push(temp_arr[0]);
                  console.log(temp_arr);
                  latArray.push(temp_arr);
                  collection.push(latArray);
                  temp_arr =[] ; latArray = [];
                  // console.log('locations',shape,shape.getPath(),locations.toString());
                 // collection.push({ type:shape.type,path:google.maps.geometry.encoding.encodePath(shape.getPath())});
                break;
              default:
                // alert('implement a storage-method for '+shape.type)
            }
          }
          //collection is the result
          console.log("array"+collection);
          // document.getElementById('geofence_latlng').value = JSON.stringify(collection);
          // document.getElementById('city_geofence_latlng').value = JSON.stringify(collection);
        },
        mkArray:function(item,index){
          tempLat.push(item.lng());
          tempLat.push(item.lat());
          temp_arr.push(tempLat);
          tempLat = [];
        },
        newPolyLine:function(polyOptions){
          var polyLine = new google.maps.Polyline(polyOptions);
          polyLine.setMap(citymapnew);
          // google.maps.event.addListener(polyLine, 'click', function (event) {
          //     shapes1.setSelection(polyLine);
          // });  
          var overlay = {
            overlay: polyLine, 
            type: google.maps.drawing.OverlayType.POLYGON
          };
          return overlay;
        },
        newPolyOptions:function(path){
              return new google.maps.Polygon({
                  path:path,
                  fillOpacity:0.5,
                  // clickable:false,
                  // draggable: false
              });
          },
          mapToLatLng:function(source, index, array){
              return new google.maps.LatLng(parseFloat(source[1]), parseFloat(source[0]));
          },
          toLatLng:function(array){
            return array.map(this.mapToLatLng);
          }
      };

    if(value!=''){
        value = JSON.parse(value);
        for (var i = value.length - 1; i >= 0; i--) {   
            shapes.add(shapes.newPolyLine(shapes.newPolyOptions(shapes.toLatLng(value[i][0]))));
        }
        shapes.save();
    }

    if(value1!=null){
        value1 = JSON.parse(value1);
        for (var i = value1.length - 1; i >= 0; i--) {   
            shapes1.add(shapes1.newPolyLine(shapes1.newPolyOptions(shapes1.toLatLng(value1[i][0]))));
        }
        shapes1.save();
    }
        
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        drawingMode: null,
        polygonOptions: polyOptions,
        map: mapnew
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        drawingManager.setDrawingMode(null);
        shapes.add(e);
    });


    google.maps.event.addListener(drawingManager, 
                                    'drawingmode_changed', 
                                    function(){shapes.clearSelection();});
    google.maps.event.addListener(mapnew, 
                                    'click', 
                                    function(){shapes.clearSelectmapnewion();});
    google.maps.event.addDomListener(document.getElementById("delete-button"), 
                                    'click', 
                                    function(){shapes.deleteSelected();});

    /** Search box related script - start **/
    var input = document.getElementById("area_name");
    var searchBox = new google.maps.places.SearchBox(input);
    console.log(searchBox)
    searchBox.bindTo('bounds', mapnew);

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if(places[0] && places[0].geometry)
        {
            $loc=places[0].geometry;
        }else{
            $loc=places.geometry;
        }
        var lat =$loc.location.lat(),
            lng =$loc.location.lng();
        $("#latitude").val(lat);
        $("#longitude").val(lng);
        mapnew.setCenter(new google.maps.LatLng(parseFloat(lat),parseFloat(lng)));
        mapnew  .setZoom(15);
    });
    /** Search box related script - end **/

}

function initMap() {
    var lat = document.getElementById('latitude').value;
    var lng = document.getElementById('longitude').value;
    var myLatlng = new google.maps.LatLng(Number(lat), Number(lng));
    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById('mapscript'), {
        center: {lat: Number(lat), lng: Number(lng)},
        zoom: 13
    });
    var input = document.getElementById('searchMapInput');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true

    });

    autocomplete.addListener('place_changed', function () {
        marker.setVisible(true);
        var place = autocomplete.getPlace();
        /* If the place has a geometry, then present it on a map. */
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        document.getElementById('latitude').value = place.geometry.location.lat();
        document.getElementById('longitude').value = place.geometry.location.lng();
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
        /* Location details */
    });

    // draggabled address /* Start
    google.maps.event.addListener(marker, 'dragend',
    function (marker) {
        var latLng = marker.latLng;
        currentLatitude = latLng.lat();
        currentLongitude = latLng.lng();
        geocoder.geocode({'latLng': latLng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    document.getElementById('searchMapInput').value = results[0].formatted_address;
                    document.getElementById('latitude').value = currentLatitude;
                    document.getElementById('longitude').value = currentLongitude;
                    infowindow.setContent('<div>' + results[0].formatted_address + '<br>');
                    infowindow.open(map, marker);
                }
            }
        });
    });
}