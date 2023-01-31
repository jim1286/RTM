let user = new Object()

user.name = 'John'
user.subname = 'Smith'
console.log(user.name)
console.log(user.subname)

user.name = 'Pete'
console.log(user.name)
console.log(user.subname)

delete user.name
console.log(user.name)
console.log(user.subname)