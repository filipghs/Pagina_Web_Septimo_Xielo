// ─── Datos reales de Séptimo Xielo (extraídos del menú oficial) ─────────────

export const INITIAL_MENU = [
  // ENTRADAS
  { id:"m1",  nombre:"Ceviche de chicharrón",   precio:24000, cat:"Entradas",     desc:"Trozos de chicharrón crujiente bañados en un cóctel de limón, naranja y finas plumas de cebolla morada.", disponible:true },
  { id:"m2",  nombre:"Alitas horneadas",         precio:16000, cat:"Entradas",     desc:"Alas bañadas en salsa barbecue de tamarindo, acompañadas de papas nativas chorreadas.", disponible:true },
  { id:"m3",  nombre:"Albóndigas a la diabla",   precio:22000, cat:"Entradas",     desc:"Albóndigas 100% carne de res en salsa napolitana picante, acompañadas con papas nativas en casco.", disponible:true },
  { id:"m4",  nombre:"Cóctel de camarón",        precio:28000, cat:"Entradas",     desc:"Frescos y jugosos camarones con una salsa al mejor estilo caribeño.", disponible:true },
  { id:"m5",  nombre:"Camarones encocados",      precio:32000, cat:"Entradas",     desc:"Frescos camarones rebosados en leche de coco y ahumados con especias.", disponible:true },
  { id:"m6",  nombre:"Ceviche de mango",         precio:30000, cat:"Entradas",     desc:"Finos cortes de pescado blanco, cuadros de mango biche y plumas de cebolla, cocinados en limón y leche de tigre de la casa.", disponible:true },
  { id:"m7",  nombre:"Carpacho de res o salmón", precio:38000, cat:"Entradas",     desc:"Finas lonjas de lomo de res o salmón, cocinados en limón y un terciopelo de pesto de albahaca.", disponible:true },
  { id:"m8",  nombre:"Pulpo baby",               precio:42000, cat:"Entradas",     desc:"Exquisitos pulpos rebosados en aceite de oliva y acompañados de anti pasto ahumado.", disponible:true },
  // PLATOS FUERTES — PESCADOS
  { id:"m9",  nombre:"Mojarra Papillón",         precio:45000, cat:"Platos Fuertes", desc:"Mojarra al vapor acompañada de verduras aromatizadas con limonaria, croquetas de arroz de coco y patacón de banano verde.", disponible:true },
  { id:"m10", nombre:"Salmón",                   precio:58000, cat:"Platos Fuertes", desc:"Salmón a la parrilla con salsa de maracuyá o uchuvas. Acompañado de puré de papa mixta y espárragos.", disponible:true },
  { id:"m11", nombre:"Colas de mero",            precio:50000, cat:"Platos Fuertes", desc:"Colas de mero rebozadas, acompañadas de chip de papa nativa y ensalada fresca.", disponible:true },
  // PLATOS FUERTES — MARISCOS
  { id:"m12", nombre:"Colonche",                 precio:54000, cat:"Platos Fuertes", desc:"Combinación exótica ecuatoriana de camarones con maní, leche de coco y patacón de banano.", disponible:true },
  { id:"m13", nombre:"Cazuela de mariscos",      precio:58000, cat:"Platos Fuertes", desc:"Mezcla de mariscos en guiso cremoso, elaborado con nuestra base y leche de coco, acompañado de croquetas de arroz de coco.", disponible:true },
  { id:"m14", nombre:"Tierra y Mar",             precio:68000, cat:"Platos Fuertes", desc:"Del mar el mero, de la tierra el cornero. Acompañado de plátano en tentación, torta española y vegetales horneados.", disponible:true },
  // PLATOS FUERTES — ARROCES
  { id:"m15", nombre:"Chaufa de chicharrón",     precio:38000, cat:"Platos Fuertes", desc:"Trozos de panceta salteada al estilo peruano, con pimentón, cebolla junca, huevo, salsa de soya y ostras. Chips de papa nativa.", disponible:true },
  { id:"m16", nombre:"Arroz Teriyaki",           precio:38000, cat:"Platos Fuertes", desc:"Verduras salteadas en salsa teriyaki, aromatizado con albahaca, pollo y cerdo, acompañada de papa en casco.", disponible:true },
  { id:"m17", nombre:"Arroz Thai",               precio:38000, cat:"Platos Fuertes", desc:"Variedad de verduras salteadas en salsa soya con pollo y cerdo, acompañado de papa en casco.", disponible:true },
  { id:"m18", nombre:"Arroz Xielo",              precio:46000, cat:"Platos Fuertes", desc:"Mix de mariscos salteados al wok con vegetales en aceite de ajonjolí, aromatizados con hierbabuena y salsa de ostión y soya.", disponible:true },
  // PLATOS FUERTES — CARNES
  { id:"m19", nombre:"Codillo de cerdo",         precio:55000, cat:"Platos Fuertes", desc:"Se sirve sobre una base de frijoles verdes guisados y papa criolla al romero.", disponible:true },
  { id:"m20", nombre:"Asado de tira",            precio:60000, cat:"Platos Fuertes", desc:"Deliciosas costillas de res horneadas, acompañadas de vegetales a la parrilla y papa chorrío.", disponible:true },
  { id:"m21", nombre:"Tomahawk",                 precio:85000, cat:"Platos Fuertes", desc:"Jugoso corte de carne de res, acompañado de vegetales salteados y papa casco.", disponible:true },
  { id:"m22", nombre:"Lomo Capresse",            precio:55000, cat:"Platos Fuertes", desc:"Trozos de lomo jugoso a la plancha, servidos sobre cama de espagueti con fresca ensalada capresse.", disponible:true },
  { id:"m23", nombre:"Rabo de toro",             precio:55000, cat:"Platos Fuertes", desc:"Cocción de tres horas al horno en vino tinto, acompañado de torta española y vegetales.", disponible:true },
  { id:"m24", nombre:"Pechuga Passion",          precio:38000, cat:"Platos Fuertes", desc:"Pechuga bridada en tocineta con salsa de maracuyá, servida en cama de puré de papa y vegetales encurtidos.", disponible:true },
  // SUSHIS
  { id:"m25", nombre:"Pacific Roll",             precio:35000, cat:"Sushis",        desc:"Rollo de salmón, aguacate y queso crema envuelto en plátano maduro frito.", disponible:true },
  { id:"m26", nombre:"Bola Xelestial",           precio:38000, cat:"Sushis",        desc:"Esfera de arroz cubierta con salmón fresco, relleno de wakame, aguacate, salmón y queso crema.", disponible:true },
  { id:"m27", nombre:"Philadelphia Gratin",      precio:35000, cat:"Sushis",        desc:"Rollo de salmón y queso crema, coronado con un toque de fuego que lo gratina y realza su sabor.", disponible:true },
  { id:"m28", nombre:"California Dinamita",      precio:38000, cat:"Sushis",        desc:"Rollo de palmito de cangrejo con aguacate y pepino europeo, cubierto con salsa dinamita.", disponible:true },
  { id:"m29", nombre:"Rainbow Roll",             precio:46000, cat:"Sushis",        desc:"Rollo de tilapia frita decorado con capas de aguacate, wakame, masago y salmón.", disponible:true },
  { id:"m30", nombre:"Kiury Tako",               precio:46000, cat:"Sushis",        desc:"Rollo de pulpo baby a la plancha con mayonesa japonesa y pimientos morrón.", disponible:true },
  { id:"m31", nombre:"Ebi Tempura",              precio:45000, cat:"Sushis",        desc:"Rollo de langostino empanizado en panko con aguacate y queso crema.", disponible:true },
  // VEGETARIANOS
  { id:"m32", nombre:"Arroz vegetariano",        precio:38000, cat:"Vegetarianos",  desc:"Variedad de vegetales salteados al wok, con albahaca, aceite de ajonjolí y salsa de soja, acompañado de papa en casco.", disponible:true },
  { id:"m33", nombre:"Ensalada César",           precio:35000, cat:"Vegetarianos",  desc:"Mix de lechugas, crutones artesanales, queso parmesano, aderezo cesar, pechuga de pollo o portobello.", disponible:true },
  { id:"m34", nombre:"Pasta Thai",               precio:36000, cat:"Vegetarianos",  desc:"Pasta corta con vegetales salteados, portobello, aromatizada con soya y aceite de ajonjolí, acompañada de pan.", disponible:true },
  { id:"m35", nombre:"Lasagna",                  precio:32000, cat:"Vegetarianos",  desc:"Capas de zucchini, berenjena, plátano maduro, queso mozzarella y salsa pomodoro casera, con pan.", disponible:true },
  { id:"m36", nombre:"Hamburguesa vegetariana",  precio:36000, cat:"Vegetarianos",  desc:"Pan brioche con portobello marinado y sellado, queso gouda, cebolla caramelizada, mix de lechuga y tomate, papa casco.", disponible:true },
  // POSTRES
  { id:"m37", nombre:"Crema catalana",           precio:12000, cat:"Postres",       desc:"Crema aromatizada con canela y ralladura de cítricos, coronada con una capa crujiente de azúcar caramelizado.", disponible:true },
  { id:"m38", nombre:"Cheesecake de Jack Daniel's", precio:12000, cat:"Postres",    desc:"Tarta cremosa con base de galleta crocante, infusionada con un toque de Jack Daniel's con notas de vainilla y caramelo.", disponible:true },
  { id:"m39", nombre:"Peras al vino",            precio:12000, cat:"Postres",       desc:"Peras cocidas lentamente en vino tinto especiado. Se sirven tiernas y jugosas con su almíbar reducido.", disponible:true },
];

export const INITIAL_CONTACT = {
  telefono: "+57 321 301 2524",
  email: "reservas@septimoxielo.co",
  direccion: "Bogotá, Colombia · Zona Rosa",
  horario: {
    dias: "Martes – Domingo",
    horas: "12:00 – 23:00",
    nota: "Lunes cerrado",
  },
  redes: {
    instagram: "https://instagram.com/septimoxielo",
    facebook: "https://facebook.com/septimoxielo",
    tiktok: "https://tiktok.com/@septimoxielo",
    whatsapp: "https://wa.me/573213012524",
  },
  menuPdf: "/menu.pdf",
};

export const INITIAL_RESERVATIONS = [];

export const CATEGORIES = ["Todos", "Entradas", "Platos Fuertes", "Sushis", "Vegetarianos", "Postres"];
