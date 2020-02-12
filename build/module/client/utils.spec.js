import { formatPayload, checkMandatoryParams } from './utils';
describe('checkMandatoryParams', () => {
    it('should return an error when trying to call a function without mandatory params', done => {
        const email = undefined;
        const password = undefined;
        const validParams = checkMandatoryParams({
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
        const payload = formatPayload('listAssets', result);
        expect(payload).toEqual({
            type: 'ok',
            data: []
        });
        done();
    });
    it('should receive { type : error, message : errorMessage } when provided an graphql Error', done => {
        const result = { errors: [{ message: '1234' }] };
        const payload = formatPayload('listAssets', result);
        expect(payload).toEqual({
            type: 'error',
            message: '1234'
        });
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnQvdXRpbHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRTdELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsRUFBRSxDQUFDLGdGQUFnRixFQUFFLElBQUksQ0FBQyxFQUFFO1FBQzFGLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQTtRQUN2QixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUE7UUFDMUIsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUM7WUFDdkMsS0FBSztZQUNMLFFBQVE7WUFDUixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDMUIsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsK0RBQStEO1NBQ3pFLENBQUMsQ0FBQTtRQUNGLElBQUksRUFBRSxDQUFBO0lBQ1IsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBQzdCLEVBQUUsQ0FBQyw2RkFBNkYsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUN2RyxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBZSxDQUFBO1FBQ3hELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN0QixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxFQUFFLENBQUE7SUFDUixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx3RkFBd0YsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNsRyxNQUFNLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQWUsQ0FBQTtRQUM3RCxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdEIsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsTUFBTTtTQUNoQixDQUFDLENBQUE7UUFDRixJQUFJLEVBQUUsQ0FBQTtJQUNSLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==