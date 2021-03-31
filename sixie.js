const Discord = require("discord.js")    //Sixie 
const client = new Discord.Client();      //Sixie 
const fs = require("fs");   //Sixie 
const jimp = require("jimp");    //Sixie 
const moment = require("moment"); //Sixie 
const express = require("express"); //Sixie 
const app = express();  //Sixie 
const ayarlar = require('./ayarlar.json') //Sixie 
const db = require('quick.db')          //Sixie 
require('./util/Loader.js')(client);    //Sixie 
const dctr = require('dctr-antispam.js') //Sixie  

client.commands = new Discord.Collection(); //Sixie 
client.aliases = new Discord.Collection(); //Sixie 
fs.readdir("./komutlar/", (err, files) => { //Sixie 
  if (err) console.error(err); //Sixie 
  console.log(`${files.length} komut yüklenecek.`); //Sixie 
  files.forEach(f => { //Sixie 
    let props = require(`./komutlar/${f}`); //Sixie 
    console.log(`Yüklenen komut: ${props.help.name}.`); //Sixie 
    client.commands.set(props.help.name, props); //Sixie  
    props.conf.aliases.forEach(alias => { //Sixie  
      client.aliases.set(alias, props.help.name); //Sixie 
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////Ever - Here Engel

client.on("message", async message => {
let everengelle = await db.fetch(`everengel_${message.guild.id}`)
if(everengelle) {
let engel = ['@here','@everyone']
if(engel.some(word => message.content.toLowerCase().includes(word))) {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    message.delete({reason: 'Sixie Ever - Here Engel Koruma!'})
  message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
  :x: ${message.author} Bu Sunucuda Ever - Here Engel Sistemi Aktif!
  `)).then(message => message.delete({timeout: 5000}))
  }
}
}
}); 

//////////////Ever - Here Engel

//////////////Küfür Engel

client.on("message", async message => {
  let küfür = db.fetch(`kufurengel_${message.guild.id}`)
  if(küfür) {
    let kufur = [
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq",
      "oç"
    ];
    if (kufur.some(word => message.content.includes(word))) {
      try {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
          message.delete({reason: 'Sixie Küfür Koruma!'})
          message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
          **:x: ${message.author} Bu Sunucuda Küfür Etmemelisin!**
          `)).then(message => message.delete({timeout: 3000}))
        } 
      } catch (err) {
        console.log(err);
    }
  }
}
if(!küfür) return
});

client.on("messageUpdate", async message => {
  let küfür = db.fetch(`kufurengel_${message.guild.id}`)
  if(küfür) {
    let kufur = [
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq",
      "oç"
    ];
    if (kufur.some(word => message.content.includes(word))) {
      try {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
          message.delete({reason: 'Sixie Küfür Koruma!'})
          message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
          **:x: ${message.author} Bu Sunucuda Küfür Etmemelisin!**
          `)).then(message => message.delete({timeout: 3000}))
        } 
      } catch (err) {
        console.log(err);
    }
  }
}
if(!küfür) return
});

//////////////Küfür Engel

//////////////Reklam Engel

client.on("message", async message => {
let uyarılar = await db.fetch(`uyarılar_${message.author.id}`)
let reklam = await db.fetch(`reklamengel_${message.guild.id}`)
if(reklam) {
  let reklam2 = [
    "discord.app",
    "discord.gg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az"
  ];
  if(reklam2.some(word => message.content.toLowerCase().includes(word))) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete({reason: 'Sixie Reklam Koruma Sistemi!'})
      db.add(`uyarılar_${message.author.id}`, 1)
      if(uyarılar === null) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
      **:x: ${message.author} Reklam Yapmamalısın İlk Uyarınız! ( 1 / 3 )**
      `)).then(message => message.delete({timeout: 3000}))
      if(uyarılar === 1) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
      **:x: ${message.author} Reklam Yapmamalısın İkinci Uyarınız! ( 2 / 3 )**
      `)).then(message => message.delete({timeout: 3000}))
      message.member.kick({reason: 'Sixie Reklam Koruma Sistemi!'})
      if(uyarılar === 2) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
      **:x: ${message.author} Uyarılara Rağmen Reklam Yaptığı İçin Sunucudan Atıldı! ( 3 / 3 )**
      `)).then(message => message.delete({timeout: 3000}))
      if(uyarılar === 3) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
      **:x: ${message.author} Kullanıcı Atıldıktan Sonra Reklam Yapmaya Devam Ettiği İçin Yasaklandı!
      `)).then(message => message.delete({timeout: 3000}))
      message.member.ban({reason: 'Sixie Reklam Koruma Sistemi!'})
      db.delete(`uyarılar_${message.author.id}`)
    }
  }
}
})
//////////////Reklam Engel

//////////////Spam Engel

client.on("message", async message => {
let spam = await db.fetch(`spamengel_${message.guild.id}`)
if(!spam) return;
const zaman = await db.fetch(`zaman_${message.guild.id}.${message.author.id}`)
const zamanaşımı = await db.fetch(`zamanaşımı_${message.guild.id}.${message.author.id}`)
db.add(`mesaj_${message.guild.id}.${message.author.id}`, 1)
if(zamanaşımı) {
const mesaj = await db.fetch(`mesaj_${message.guild.id}.${message.author.id}`)
if(!message.member.hasPermission("ADMINISTRATOR")) {
if(Date.now() < zaman) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**:x: ${message.author} Bu Sunucuda Spam Yapmamalısın!**
`)).then(message => message.delete({timeout: 3000}))
message.delete({reason: 'Sixie Spam Koruması!'})
}
} else {
db.set(`zaman_${message.guild.id}.${message.author.id}`, Date.now()+3000);
db.set(`zamanaşımı_${message.guild.id}.${message.author.id}`, 'tamam');
setTimeout(() => {
db.delete(`zamanaşımı_${message.guild.id}.${message.author.id}`);
db.delete(`mesaj_${message.guild.id}.${message.author.id}`);
}, 500)
}
});

//////////////Spam Engel

//////////////Caps Lock Engel

client.on("message", async message => {
let caps = await db.fetch(`capsengel_${message.guild.id}`)
if(message.author.bot) return;
if(message.content.length > 4) {
if(db.fetch(`capsengel_${message.guild.id}`)) {
  let koruma = message.content.toUpperCase()
if(message.content == koruma) {
if(!message.member.hasPermission("ADMINISTRATOR")) {
if(!message.mentions.users.first()) {
message.delete({reason: 'Sixie Caps Lock Koruma!'})
return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**:x: ${message.author} Bu Sunucuda Caps Lock Açmamalısın!**
`)).then(message => message.delete({timeout: 3000}))
}
}
}
}
}
});

//////////////Caps Lock Engel

/////////////Mod - Log

client.on("channelCreate", async sixie => {
let kanal = await db.fetch(`sixielog_${sixie.guild.id}`)
let kanalgönder = sixie.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Birisi Kanal Oluşturdu!**`).addField(`İsmi: \`${sixie.name}\``, `Türü: \`${sixie.type}\` \n ID: \`${sixie.id}\``))
}
});

client.on("channelDelete", async sixie => {
let kanal = await db.fetch(`sixielog_${sixie.guild.id}`)
let kanalgönder = sixie.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Birisi Kanal Silindi!**`).addField(`İsmi: \`${sixie.name}\``, `Türü: \`${sixie.type}\` \n ID: \`${sixie.id}\``))
}
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
let kanal = await db.fetch(`sixielog_${newChannel.guild.id}`)
let kanalgönder = newChannel.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Birisi Kanal İsmi Değiştirdi!**`).addField(`Eski İsmi: \`${oldChannel.name}\` `,` Yeni İsmi: \`${newChannel.name}\` \n ID: \`${newChannel.id}\``))
}
});

client.on("emojiCreate", async sixie => {
let kanal = await db.fetch(`sixielog_${sixie.guild.id}`)
let kanalgönder = sixie.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Birisi Emoji Oluşturdu!**`).addField(`İsmi: \`${sixie.name}\` `,`GIF : \`${sixie.animated}\`\n ID: \`${sixie.id}\``))
}
});

client.on("emojiDelete", async sixie => {
let kanal = await db.fetch(`sixielog_${sixie.guild.id}`)
let kanalgönder = sixie.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Birisi Emoji Sildi!**`).addField(`İsmi: \`${sixie.name}\` `,`GIF : \`${sixie.animated}\`\n ID: \`${sixie.id}\``))
}
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
let kanal = await db.fetch(`sixielog_${newEmoji.guild.id}`)
let kanalgönder = newEmoji.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Birisi Emoji İsmi Değiştirdi!**`).addField(`Eski ismi: \`${oldEmoji.name}\``,` Yeni İsmi: \`${newEmoji.name}\` \n GIF : **${newEmoji.animated}**\n ID: \`${newEmoji.id}\``))
}
});

client.on("guildBanAdd", async user => {
let kanal = await db.fetch(`sixielog_${user.guild.id}`)
let kanalgönder = user.guild.channels.cache.get(kanal)
if(kanal) {
const kullanıcı = await user.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Kullanıcı Banlandı!**`).addField(`İsmi: \`${user.username}\``,`ID: \`${user.id}\` \n Sebep: \`${kullanıcı.reason || 'Belirtilmemiş!'}\` \n Banlayan: \`${kullanıcı.executor.username}\``))
}
})

client.on("guildBanRemove", async user => {
let kanal = await db.fetch(`sixielog_${user.guild.id}`)
let kanalgönder = user.guild.channels.cache.get(kanal)
if(kanal) {
const kullanıcı = await user.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Kullanıcının Banı Açıldı!**`).addField(`İsmi: \`${user.username}\``,`ID: \`${user.id}\` \n Banı Kaldıran: \`${kullanıcı.executor.username}\``))
}
})

client.on("messageDelete", async message => {
if(message.author.bot) return
let kanal = await db.fetch(`sixielog_${message.guild.id}`)
let kanalgönder = message.guild.channels.cache.get(kanal)
if(kanal) {
const kullanıcı = await user.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Mesaj Silindi!**`).addField(`Mesaj: \`${message.content}\``,`Kanal: \`${message.channel.name}\` \n Silen Kişi: \`${kullanıcı.username}\``))
}
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(oldMessage.author.bot) return;
if(oldMessage.content == newMessage.content) return;
let kanal = await db.fetch(`sixielog_${newMessage.guild.id}`)
let kanalgönder = newMessage.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Mesaj Güncellendi!**`).addField(`Eski Mesaj: \`${oldMesage.content}\``,`Mesaj: \`${newMessage.content}\` \n Kanal: \`${newMessage.channel.name}\``))
}
})

client.on("roleCreate", async rol => {
let kanal = await db.fetch(`sixielog_${rol.guild.id}`)
let kanalgönder = rol.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Rol Oluşturuldu!**`).addField(`İsmi: \`${rol.name}\``,`ID: \`${rol.id}\` \n Rengi: \`${rol.hexColor}\``))
}
})

client.on("roleDelete", async rol => {
let kanal = await db.fetch(`sixielog_${rol.guild.id}`)
let kanalgönder = rol.guild.channels.cache.get(kanal)
if(kanal) {
kanalgönder.send(new Discord.MessageEmbed().setTimestamp().setColor('0x36393E').setDescription(`
**❗ Rol Silindi!**`).addField(`İsmi: \`${rol.name}\``,`ID: \`${rol.id}\` \n Rengi: \`${rol.hexColor}\``))
}
})

/////////////Mod - Log
client.login(ayarlar.token);