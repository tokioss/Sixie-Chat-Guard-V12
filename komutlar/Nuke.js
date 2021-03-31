const Discord = require('discord.js')

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
:x: Bu Komutu Kullanabilmek İçin Yönetici İznine Sahip Olmalısın.
`))

message.channel.clone().then(kanal => {
kanal.setPosition(message.channel.position);
message.channel.delete({reason: 'Sixie Nuke Sistemi!'})
kanal.send(new Discord.MessageEmbed().setColor('0x36393E').setDescription(`
**✅ Kanal Silinip Tekrardan Açıldı!**
`)).then(message => message.delete({timeout: 5000}))
})
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['silaç','sil-aç'],
    permLevel: 3
  };
  
  exports.help = {
    name: 'nuke',
    description: 'Bulunduğunuz Kanalı Silip Tekrardan Açar.',
    usage: 'nuke'
  };