var botonjugar=document.getElementById("botonUno");
var botonDos=document.getElementById("botonDos");
var palabraNueva=document.getElementById("estiloInput");
var botEinp=document.getElementById("botones");
var cajaInput=document.getElementById("inputTexto");
var touch= document.getElementById("form")
var errorL=document.getElementById("errorestexto");
var nVidas=document.getElementById("vidasTexto");
var palabrasDelJuego=["hola","adios","omar","ricardo","caleb","pera","elefante","tornillo","qwerty","zorro","arbol","perro","manzana","platano","aguacate","clavo","sofa","refrigerar","gato"];
var contador=document.getElementById("vidasNumero");
var erroresLetra=document.getElementById("erroresLetra");
var inputMovil=document.getElementById("inputMovile")
cajaInput.classList.add("ejs");
var canvas=document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var regex=/[a-z]/i;
var texto="";
var textoArray=[];
var linea = 40;        
var espacio = 20;
var areaTotal=0;
var puntoPartida=0;
var errores="";
var numVidas=0;
var posiciones="";
var letra="";
var cajaUno="";
var cajaDos="";
 var base = ()=>{
	ctx.fillRect(0,260,600,2);
	ctx.beginPath();
	ctx.moveTo(150, 230); 
	ctx.lineTo(100, 260);
	ctx.lineTo(200, 260);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(150, 230);
	ctx.lineTo(150,50);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(150, 50);
	ctx.lineTo(300,50);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(450, 230); 
	ctx.lineTo(500, 260);
	ctx.lineTo(400, 260);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(450, 230);
	ctx.lineTo(450,50);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(300, 50);
	ctx.lineTo(450,50);
	ctx.stroke();
	}
var cabeza = () => {
		ctx.beginPath();
		ctx.arc(300, 95, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(310, 110);
		ctx.arc(300, 110, 10, 0, Math.PI, true);  // Mouth (clockwise)
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.moveTo(296, 85);
		ctx.arc(293, 85, 2, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(310, 85);
		ctx.arc(307, 85, 2, 0, Math.PI * 2, true);  // Right eye
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(300, 50);
		ctx.lineTo(300,70);
		ctx.stroke();
	}
var ganador=()=>{
		ctx.clearRect(0, 0, 600,262);
		ctx.fillRect(150,240,300,2);
		ctx.beginPath();
		ctx.arc(300, 95, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(310, 100);
		ctx.arc(300, 100, 10, 0, Math.PI, false);  // Mouth (clockwise)
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.moveTo(296, 85);
		ctx.arc(293, 85, 2, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(310, 85);
		ctx.arc(307, 85, 2, 0, Math.PI * 2, true);  // Right eye
		ctx.fill();
		ctx.stroke();
		torso()
		brazoDerecho()
		brazoIzquierdo()
		piernaDerecha()
		piernaIzquierda()
	}
var perdedor=()=>{
		ctx.clearRect(0, 0, 600,262);
		base();
		ctx.beginPath();
		ctx.moveTo(300, 50);
		ctx.lineTo(300,70);
		ctx.stroke();
		ctx.fillRect(0,260,600,2);	
		ctx.beginPath();
		ctx.arc(300, 235, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(300, 255);
		ctx.arc(309, 250, 9,.8*Math.PI, 1.8*Math.PI, false);  // Mouth (clockwise)
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="red";
		ctx.moveTo(292, 233);
		ctx.arc(289, 233, 3, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(309, 224)
		ctx.arc(306, 224, 3, 0, Math.PI * 2, true);  // Right eye
		ctx.fill();
		ctx.stroke();
	}
var torso = ()=> {
		ctx.beginPath();
		ctx.moveTo(300, 120);
		ctx.lineTo(300,200);
		ctx.stroke();
	}
var brazoIzquierdo = ()=> {
		ctx.beginPath();
		ctx.moveTo(300, 130);
		ctx.lineTo(250,120);
		ctx.stroke();
	}
var brazoDerecho=()=> {
		ctx.beginPath();
		ctx.moveTo(300, 130);
		ctx.lineTo(350,120);
		ctx.stroke();
	}
var piernaIzquierda=()=> {
		ctx.beginPath();
		ctx.moveTo(300, 200);
		ctx.lineTo(250,240);
		ctx.stroke();
	}
var piernaDerecha=()=> {
		ctx.beginPath();
		ctx.moveTo(300, 200);
		ctx.lineTo(350,240);
		ctx.stroke();
	}
var cuerpo= [piernaIzquierda ,piernaDerecha,brazoIzquierdo,brazoDerecho,torso,cabeza];
var parteCuerpo= (numero)=> numero();
botonDos.addEventListener("click",function(e){
	botonDos.textContent="Agregar"
	cajaInput.classList.remove("ejs");
	palabraNueva.focus();	
	if (palabraNueva.value== "") {return}																
	if(regex.test(palabraNueva.value)){
	 	var palabra=palabraNueva.value
	 	var nrp=new RegExp(palabra)
	 	if(!/|\W|\d|_|\s/.test(palabra)){
	 		if(!nrp.test(palabrasDelJuego)){
	 			palabrasDelJuego.push(palabra.toLowerCase());
				palabraNueva.value="";
				cajaInput.classList.add("ejs");
		 	}	
		}
		else{palabraNueva.textContent="";}	
	}
});		 
function jugar(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	errores="";
	erroresLetra.textContent=""
	letra="",
	cajaDos="";
	inputMovil.addEventListener("keyup",comparar)
	touch.addEventListener("click",()=>{inputMovil.focus()})
	base();
	numVidas=6
	contador.textContent=numVidas
	inputMovil.focus();
	botEinp.classList.add("ejs");
	contador.classList.add("azul");
	erroresLetra.classList.add("azul");
	errorL.textContent="Errores"		
	nVidas.textContent="Vidas"
	cajaInput.classList.add("ejs");
	document.getElementById("vidas").classList.add("naranja");
	document.getElementById("errores").classList.add("naranja");
	var azar = palabrasDelJuego[Math.floor(Math.random() * palabrasDelJuego.length)];
	texto = azar;
	textoArray = texto.split(""); 
	areaTotal= ((texto.length*linea)+((texto.length-1)*espacio));
	puntoPartida=((600-areaTotal)/2);
	textoArray.forEach(function prueba (e,p) {
		posiciones=puntoPartida+((linea+espacio)*p);
		ctx.beginPath();
		ctx.moveTo(posiciones,360);
		ctx.lineTo(posiciones+linea,360);
		ctx.stroke();
	})
}
botonjugar.addEventListener("click",jugar);
touch
function juez (a,b){
	inputMovil.removeEventListener("keyup",comparar)
	touch.removeEventListener("click",()=>{inputMovil.focus()})
	botEinp.classList.remove("ejs");
	ctx.font = '40px calibri';
	ctx.fillStyle = 'Black';
	ctx.textAlign="center";
	ctx.fillText(a, 300, 40);
	ctx.fillText(b, 300, 300);
}
function comparar(e){
	cajaUno=inputMovil.value.toLowerCase();
	if (!/\d|\W|_/g.test(cajaUno)) {
		var letraRegex=new RegExp(cajaUno)
		inputMovil.value=""
		if (letraRegex.test(texto)) {
			if (!letraRegex.test(letra)) {
				letra=cajaUno+letra
				textoArray.forEach(function (elemento,posicion){
					if(cajaUno==elemento){
						posiciones=puntoPartida+((linea+espacio)*posicion);
						ctx.beginPath();
						ctx.font="bold 45px arial"; 
						ctx.textAlign="center";
						ctx.textBaseline = "alphabetic";
						ctx.fillText(cajaUno,posiciones+(linea/2),350); 
						ctx.stroke();
						cajaDos=elemento+cajaDos;
						if (cajaDos.length==texto.length) {
							ganador();
							juez("¡ felicidades !","acertaste a la palabra :")
						}
					}
				})
			}
		}
		else{ 
			if (!letraRegex.test(errores)) {
				errores=cajaUno+errores;
				erroresLetra.textContent=errores
				contador.textContent=numVidas-errores.length
				numero=cuerpo[contador.textContent];
				parteCuerpo(numero)
				if (contador.textContent==0) {
					perdedor()
					juez("ups perdiste","la palabra correcta es :")
					textoArray.forEach(function (elemento,posicion){
							posiciones=puntoPartida+((linea+espacio)*posicion);
							ctx.beginPath();
							ctx.font="bold 45px arial"; 
							ctx.textAlign="center";
							ctx.textBaseline = "alphabetic";
							ctx.fillText(elemento,posiciones+(linea/2),350); 
							ctx.stroke();
					})		
				}
			}
		}	
	}
	else{inputMovil.value=""}
}

