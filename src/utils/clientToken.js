

export const getClientToken = (userId)=>{




    const paddedUserId = userId.toString().padStart(16, '0');
    const hexUserId = String(paddedUserId).toString('hex');
    
    return hexUserId;

}