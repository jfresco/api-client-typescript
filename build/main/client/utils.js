"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkMandatoryParams(...args) {
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
exports.checkMandatoryParams = checkMandatoryParams;
function formatPayload(key, { errors, data }) {
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
exports.formatPayload = formatPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50L3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsU0FBZ0Isb0JBQW9CLENBQ2xDLEdBQUcsSUFBZ0M7SUFFbkMsNkZBQTZGO0lBQzdGLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUN0QixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBRTdCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsQyxJQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUU7Z0JBQ2xCLFNBQVE7YUFDVDtZQUNELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6QixzQ0FBc0M7WUFDdEMsOEJBQThCO1lBQzlCLElBQUk7WUFDSixJQUFJLE9BQU8sUUFBUSxLQUFLLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLDJCQUEyQixDQUFDLENBQUE7YUFDL0M7WUFDRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFlBQVksRUFBRTtnQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLFlBQVksRUFBRSxDQUFDLENBQUE7YUFDdEQ7U0FDRjtLQUNGO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN2QixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFBO0tBQ0Y7SUFDRCxPQUFPO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDM0IsQ0FBQTtBQUNILENBQUM7QUFqQ0Qsb0RBaUNDO0FBRUQsU0FBZ0IsYUFBYSxDQUMzQixHQUFZLEVBQ1osRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUF3QjtJQUV0QywwQ0FBMEM7SUFDMUMsSUFBSSxNQUFNLEVBQUU7UUFDVixPQUFPO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87U0FDM0IsQ0FBQTtLQUNGO0lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxPQUFPO1FBQ0wsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsT0FBTztLQUNkLENBQUE7QUFDSCxDQUFDO0FBaEJELHNDQWdCQyJ9