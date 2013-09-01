/*try {
document.getElementById("LinkFlashZJ").SetReturnValue(__flash__toXML(flashServerZJ.securityError(
({errorID:0,
text:"Error #2048",
bubbles:false,
cancelable:false,
target:(
{connected:false,
timeout:20000,
objectEncoding:3,
bytesAvailable:0,
endian:"bigEndian"}),
type:"securityError",
currentTarget:(
{connected:false,timeout:20000,objectEncoding:3,bytesAvailable:0,endian:"bigEndian"}),
eventPhase:2}
))) ); 


} catch (e) { document.getElementById("LinkFlashZJ").SetReturnValue("<undefined/>"); }
*/

function __flash__arrayToXML(obj) {
	var s = "<array>";
	for (var i=0; i<obj.length; i++) {
		s += "<property id=\"" + i + "\">" + __flash__toXML(obj[i]) + "</property>";
	}
	return s+"</array>";
}
function __flash__argumentsToXML(obj,index) {
	var s = "<arguments>";
	for (var i=index; i<obj.length; i++) {
		s += __flash__toXML(obj[i]);
	}
	return s+"</arguments>";
}
function __flash__objectToXML(obj) {
	var s = "<object>";
	for (var prop in obj) {
		s += "<property id=\"" + prop + "\">" + __flash__toXML(obj[prop]) + "</property>";
	}
	return s+"</object>";
}
function __flash__escapeXML(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function __flash__toXML(value) {
   var type = typeof(value);
	if (type == "string") {
		return "<string>" + __flash__escapeXML(value) + "</string>";
	} else if (type == "undefined") {
        return "<undefined/>";
	} else if (type == "number") {
        return "<number>" + value + "</number>";
	} else if (value == null) {
        return "<null/>";
	} else if (type == "boolean") {
        return value ? "<true/>" : "<false/>";
	} else if (value instanceof Date) {
        return "<date>" + value.getTime() + "</date>";
   } else if (value instanceof Array) {
       return __flash__arrayToXML(value);
   } else if (type == "object") {
       return __flash__objectToXML(value);
   } else {
	    return "<null/>"; //???
	}
}
function __flash__addCallback(instance, name) {
  instance[name] = function () { 
    return eval(instance.CallFunction("<invoke name=\""+name+"\" returntype=\"javascript\">" + __flash__argumentsToXML(arguments,0) + "</invoke>"));
  }
}
function __flash__removeCallback(instance, name) {
  instance[name] = null;
}