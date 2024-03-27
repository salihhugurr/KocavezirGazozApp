import Service from '../axios.common';
export const GetAllCustomers = async () => {
  try {
    const response = await Service.get('customers');
    if (response.status === 200) {
      return {
        status: true,
        message: 'İşlem Başarılı',
        data: response.data,
      };
    }
    return {
      status: false,
      message: 'İşlem Başarısız',
      data: [],
    };
  } catch (err) {
    const errorMessage = err.message;
    console.log('ERRRROR =>', err);
    return {
      status: false,
      message: errorMessage,
      data: [],
    };
  }
};

export const GetCustomerById = async id => {
  try {
    const response = await Service.get('customers/' + id);
    if (response.status === 200) {
      return {
        status: true,
        message: 'İşlem Başarılı',
        data: response.data,
      };
    }
    return {
      status: false,
      message: 'İşlem Başarısız',
      data: {},
    };
  } catch (err) {
    const errorMessage = err.message;
    console.log('ERRRROR =>', err);
    return {
      status: false,
      message: errorMessage,
      data: {},
    };
  }
};

export const AddCustomerService = async payload => {
  try {
    const response = await Service.post('customers', payload);
    if (response.status === 200) {
      return {
        status: true,
        message: 'İşlem Başarılı',
        data: response.data,
      };
    }
    return {
      status: false,
      message: 'İşlem Başarısız',
      data: [],
    };
  } catch (err) {
    const errorMessage = err.message;
    return {
      status: false,
      message: errorMessage,
      data: [],
    };
  }
};

export const UpdateCustomerService = async (payload, id) => {
  try {
    const response = await Service.put(`/customers/${id}`, payload);
    if (response.status === 200) {
      return {
        status: true,
        message: 'İşlem Başarılı',
        data: response.data,
      };
    }
    return {
      status: false,
      message: 'İşlem Başarısız',
      data: [],
    };
  } catch (err) {
    const errorMessage = err.message;
    return {
      status: false,
      message: errorMessage,
      data: [],
    };
  }
};
