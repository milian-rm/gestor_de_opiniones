import User from './user.model.js';
 
// Obtener todos los campos con paginación y filtros
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
 
    const filter = {isActive: true};
 
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };
 
    const users = await User.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(options.sort);
 
    const total = await User.countDocuments(filter);
 
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los campos',
      error: error.message,
    });
  }
};
 
// Obtener Usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
 
    const user = await User.findById(id);
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Campo no encontrado',
      });
    }
 
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el Usuario',
      error: error.message,
    });
  }
};
 
// Crear nuevo Usuario
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
  
    const user = new User(userData);
    await user.save();
 
    res.status(201).json({
      success: true,
      message: 'Campo creado exitosamente',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el Usuario',
      error: error.message,
    });
  }
};
 
// Actualizar Usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
 
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Campo no encontrado',
      });
    }
 
    res.status(200).json({
      success: true,
      message: 'Campo actualizado exitosamente',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el Usuario',
      error: error.message,
    });
  }
};
 
// Cambiar estado del Usuario (activar/desactivar)
export const changeUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    // Detectar si es activate o deactivate desde el URL
    const status = req.body;
 
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrada',
      });
    }
 
    res.status(200).json({
      success: true,
      message: `Usuario actualizada ${action}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado de el Usuario',
      error: error.message,
    });
  }
};