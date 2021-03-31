const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
:x: Bu Komutu Kullanabilmek İçin Yönetici İznine Sahip Olmalısın.
`))

if(args[0] === "kapat" || "sıfırla") {
db.delete(`sixielog_${message.guild.id}`)
message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
✅ Mod Log Kanalı Sıfırlandı.
`))};

let kanal = message.mentions.channels.first();
if(!kanal) return message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
:x: Bir Kanal Belirtmelisin.
`))

db.set(`sixielog_${message.guild.id}`, kanal.id)
message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
✅ Mod Log Kanalı Başarıyla Ayarlandı \n Ayarlanan Kanal: **${kanal}**
`))
message.react('✅')
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: 'mod-log',
    description: 'Mod Logu Ayarlarsınız.',
    usage: 'mod-log'
  };