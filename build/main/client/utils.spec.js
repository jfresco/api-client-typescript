"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe('checkMandatoryParams', () => {
    it('should return an error when trying to call a function without mandatory params', done => {
        const email = undefined;
        const password = undefined;
        const validParams = utils_1.checkMandatoryParams({
            email,
            password,
            Type: 'string'
        });
        expect(validParams).toEqual({
            type: 'error',
            message: 'email must be of type string\npassword must be of type string'
        });
        done();
    });
});
describe('formatPayload', () => {
    it('should receive { type : ok, data : providedData } object when provided a valid query result', done => {
        const result = { data: { listAssets: [] } };
        const payload = utils_1.formatPayload('listAssets', result);
        expect(payload).toEqual({
            type: 'ok',
            data: []
        });
        done();
    });
    it('should receive { type : error, message : errorMessage } when provided an graphql Error', done => {
        const result = { errors: [{ message: '1234' }] };
        const payload = utils_1.formatPayload('listAssets', result);
        expect(payload).toEqual({
            type: 'error',
            message: '1234'
        });
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnQvdXRpbHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUE2RDtBQUU3RCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLEVBQUUsQ0FBQyxnRkFBZ0YsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUMxRixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUE7UUFDdkIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFBO1FBQzFCLE1BQU0sV0FBVyxHQUFHLDRCQUFvQixDQUFDO1lBQ3ZDLEtBQUs7WUFDTCxRQUFRO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzFCLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLCtEQUErRDtTQUN6RSxDQUFDLENBQUE7UUFDRixJQUFJLEVBQUUsQ0FBQTtJQUNSLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixFQUFFLENBQUMsNkZBQTZGLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDdkcsTUFBTSxNQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQWUsQ0FBQTtRQUN4RCxNQUFNLE9BQU8sR0FBRyxxQkFBYSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3RCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDLENBQUE7UUFDRixJQUFJLEVBQUUsQ0FBQTtJQUNSLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHdGQUF3RixFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2xHLE1BQU0sTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBZSxDQUFBO1FBQzdELE1BQU0sT0FBTyxHQUFHLHFCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdEIsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsTUFBTTtTQUNoQixDQUFDLENBQUE7UUFDRixJQUFJLEVBQUUsQ0FBQTtJQUNSLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==