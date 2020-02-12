export function checkMandatoryParams(...args) {
    // should iterate over all received params and check if they match with their respective Type
    const errors = [];
    for (const arg of args) {
        const expectedType = arg.Type;
        for (const key of Object.keys(arg)) {
            if (key === 'Type') {
                continue;
            }
            const paramObj = arg[key];
            // if (typeof paramObj === 'object') {
            //   paramObj == paramObj[key]
            // }
            if (typeof paramObj === null || typeof paramObj === undefined) {
                errors.push(`${key} is missing, but required`);
            }
            if (typeof paramObj !== expectedType) {
                errors.push(`${key} must be of type ${expectedType}`);
            }
        }
    }
    if (errors.length === 0) {
        return {
            type: 'ok'
        };
    }
    return {
        type: 'error',
        message: errors.join('\n')
    };
}
export function formatPayload(key, { errors, data }) {
    // ignore graphqlErrors for not found data
    if (errors) {
        return {
            type: 'error',
            message: errors[0].message
        };
    }
    const payload = data && data[key];
    return {
        type: 'ok',
        data: payload
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50L3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsR0FBRyxJQUFnQztJQUVuQyw2RkFBNkY7SUFDN0YsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFFN0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtnQkFDbEIsU0FBUTthQUNUO1lBQ0QsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pCLHNDQUFzQztZQUN0Qyw4QkFBOEI7WUFDOUIsSUFBSTtZQUNKLElBQUksT0FBTyxRQUFRLEtBQUssSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsMkJBQTJCLENBQUMsQ0FBQTthQUMvQztZQUNELElBQUksT0FBTyxRQUFRLEtBQUssWUFBWSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxvQkFBb0IsWUFBWSxFQUFFLENBQUMsQ0FBQTthQUN0RDtTQUNGO0tBQ0Y7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUE7S0FDRjtJQUNELE9BQU87UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUMzQixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQzNCLEdBQVksRUFDWixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQXdCO0lBRXRDLDBDQUEwQztJQUMxQyxJQUFJLE1BQU0sRUFBRTtRQUNWLE9BQU87WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztTQUMzQixDQUFBO0tBQ0Y7SUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxPQUFPO0tBQ2QsQ0FBQTtBQUNILENBQUMifQ==