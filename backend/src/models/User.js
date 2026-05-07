const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // required
      trim: true,
    },
    email: {
      type: String,
      required: true, // required
      unique: true, // unique
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // required
      minlength: 6, // minimum length is 6
    },
  },
  {
    timestamps: true, // adding created at / updated at
  },
);

// Exporting the model
const User = mongoose.model("User", userSchema);
module.exports = User;

// Hash the password in the model
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare the password in the model
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// --------------------------------------------------------------------------

// NB:
// Le model User nécessite les opérations suivantes:
// - Inscription: Créer un nouveau compte user
// - Connexion: Authentifier un user existant
// - Récupérer les informations user - Obtenir les détails du User actuel
// Les opérations complètes ne sont pas requises pour le modèle User
