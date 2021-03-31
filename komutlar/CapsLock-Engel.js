const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
:x: Bu Komutu Kullanabilmek İçin Yönetici İznine Sahip Olmalısın.
`))

if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
:x: !caps-engel aç/kapat Yazmalısın.
`))
let caps = await db.fetch(`capsengel_${message.guild.id}`)
if(args[0] === 'aç') {
    if(caps) {
db.set(`capsengel_${message.guild.id}`, `acik`)
const aç = new Discord.MessageEmbed()
.setColor('0x36393E')
.setDescription(`✅ Caps Lock Engel Sistemi Zaten Açık!`)
message.channel.send(aç)
message.react('✅')
} else {
    db.set(`capsengel_${message.guild.id}`, `acik`)
    const aç = new Discord.MessageEmbed()
    .setColor('0x36393E')
    .setDescription(`✅ Caps Lock Engel Sistemi Başarıyla Açıldı!`)
    message.channel.send(aç)
    message.react('✅')
}
} else if(args[0] === 'kapat') {
db.delete(`capsengel_${message.guild.id}`)
const kapa = new Discord.MessageEmbed()
.setColor('0x36393E')
.setDescription(`✅ Caps Lock Engel Sistemi Başarıyla Kapatıldı!`)
message.channel.send(kapa)
message.react('✅')
}
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: 'caps-engel',
    description: 'Caps Lock Engel Sistemini Açıp Kapatırsınız.',
    usage: 'caps-engel'
  };