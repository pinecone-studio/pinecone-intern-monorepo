import { GraphQLResolveInfo } from 'graphql';
import { createTable } from 'src/resolvers/mutations';

jest.mock('src/models/table.model', () => ({
  TableModel: {
    create: jest.fn().mockReturnValue({
      tableId: '1',
      tableName: '2b',
      tableQR:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATVSURBVO3BQY4jRxAEwfAC//9l1xzzVECjk6PVKszwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1LzBJBJzRNAJjVvALlRMwH5TWreOKladFK16KRq0SfL1GwC8oaaCcikZgIyqZmAvKFmAvKEmk1ANp1ULTqpWnRSteiTLwPyhJongExqJiCTmhs1E5An1NwA2QTkCTXfdFK16KRq0UnVok/+Z4A8oeYGyARkUnOj5m9yUrXopGrRSdWiT/4yQJ5QcwNkUjOpmYBMQP5PTqoWnVQtOqla9MmXqflNaiYgN0Bu1ExAbtRMQCY1E5BJzRNq/iQnVYtOqhadVC36ZBmQP5maCcikZgIyqZmA/CYgf7KTqkUnVYtOqhZ98pKa/xIgk5ongDyh5kbNjZr/kpOqRSdVi06qFn3yEpBJzQRkk5pJzQTkRs0E5EbNBGRSMwGZ1NwAmdRMQDap+aaTqkUnVYtOqhZ98pKaCcik5gbIpOYGyKRmk5oJyKRmAjKpmYDcqJmAvKHmCSCTmjdOqhadVC06qVr0yb9MzQTkDTUTkAnIpGYCMqmZgExqJiCTmk1qJiBvqNl0UrXopGrRSdUi/JEXgDyhZhOQJ9S8AeRGzRtAJjUTkEnNE0AmNZtOqhadVC06qVr0yS8DsknNDZAbIE+ouQEyqbkBMqm5UXMD5EbNN51ULTqpWnRSteiTZWpugDyhZgIyAdmk5gkgN0Bu1ExA3lAzAbkBMql546Rq0UnVopOqRZ/8MjU3QCYgk5ongDwBZFIzAZnUTEAmNU+omYB8k5pNJ1WLTqoWnVQtwh9ZBORGzZ8EyKRmE5AbNTdAJjUTkEnNDZBJzaaTqkUnVYtOqhZ98mVqboA8oWYCMqm5AfIGkEnNBORGzQRkUjOpuVFzA2RS800nVYtOqhadVC3CH3kByI2aJ4BMat4AcqNmAjKpuQHyhpobIJvUTEAmNW+cVC06qVp0UrXok2VqJiCTmieATGpugExq3gDyhJo3gExqJiCTmgnIE2o2nVQtOqladFK16JMvUzMBmdRMam6APAFkUjMBuVEzAZnUvAFkUjMBmdRMQCY1N0AmNZtOqhadVC06qVr0yZcBeQPIpGYCcqNmAnKjZgLyBJBJzRNAboA8AeQGyKTmjZOqRSdVi06qFuGP/IcBeULNJiCb1DwBZJOaN06qFp1ULTqpWvTJS0B+k5pJzRNAbtTcAJnU3AB5A8ik5g0133RSteikatFJ1aJPlqnZBOQGyKRmAjKpeQLIDZBJzaTmBsiNmjfUTEAmNZtOqhadVC06qVr0yZcBeULNn0TNBOQGyKTmCSBvqJmA3ACZ1LxxUrXopGrRSdWiT/4yQCY1E5A31ExAboBMam7UvAHk33RSteikatFJ1aJP/jJqJiBPqJmATECeUPMGkCfU3ACZ1Gw6qVp0UrXopGrRJ1+m5pvUPKHmDTUTkEnNBOQNNROQSc0EZFLzm06qFp1ULTqpWvTJMiC/CciNmgnIpGYC8gaQGzU3QCY1T6iZgExqvumkatFJ1aKTqkX4I1VLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkX/APUCNUmofk9rAAAAAElFTkSuQmCC',
    }),
    findOne: jest.fn().mockResolvedValueOnce({ tableName: '2b' }),
  },
}));

describe('createTable', () => {
  it('should throw an error, if table is already exist', async () => {
    try {
      await createTable!({}, { input: { tableName: '2b' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('table already exists'));
    }
  });

  it('should create a new table', async () => {
    const result = await createTable!({}, { input: { tableName: '2b' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      tableId: '1',
      tableName: '2b',
      tableQR:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATVSURBVO3BQY4jRxAEwfAC//9l1xzzVECjk6PVKszwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1LzBJBJzRNAJjVvALlRMwH5TWreOKladFK16KRq0SfL1GwC8oaaCcikZgIyqZmAvKFmAvKEmk1ANp1ULTqpWnRSteiTLwPyhJongExqJiCTmhs1E5An1NwA2QTkCTXfdFK16KRq0UnVok/+Z4A8oeYGyARkUnOj5m9yUrXopGrRSdWiT/4yQJ5QcwNkUjOpmYBMQP5PTqoWnVQtOqla9MmXqflNaiYgN0Bu1ExAbtRMQCY1E5BJzRNq/iQnVYtOqhadVC36ZBmQP5maCcikZgIyqZmA/CYgf7KTqkUnVYtOqhZ98pKa/xIgk5ongDyh5kbNjZr/kpOqRSdVi06qFn3yEpBJzQRkk5pJzQTkRs0E5EbNBGRSMwGZ1NwAmdRMQDap+aaTqkUnVYtOqhZ98pKaCcik5gbIpOYGyKRmk5oJyKRmAjKpmYDcqJmAvKHmCSCTmjdOqhadVC06qVr0yb9MzQTkDTUTkAnIpGYCMqmZgExqJiCTmk1qJiBvqNl0UrXopGrRSdUi/JEXgDyhZhOQJ9S8AeRGzRtAJjUTkEnNE0AmNZtOqhadVC06qVr0yS8DsknNDZAbIE+ouQEyqbkBMqm5UXMD5EbNN51ULTqpWnRSteiTZWpugDyhZgIyAdmk5gkgN0Bu1ExA3lAzAbkBMql546Rq0UnVopOqRZ/8MjU3QCYgk5ongDwBZFIzAZnUTEAmNU+omYB8k5pNJ1WLTqoWnVQtwh9ZBORGzZ8EyKRmE5AbNTdAJjUTkEnNDZBJzaaTqkUnVYtOqhZ98mVqboA8oWYCMqm5AfIGkEnNBORGzQRkUjOpuVFzA2RS800nVYtOqhadVC3CH3kByI2aJ4BMat4AcqNmAjKpuQHyhpobIJvUTEAmNW+cVC06qVp0UrXok2VqJiCTmieATGpugExq3gDyhJo3gExqJiCTmgnIE2o2nVQtOqladFK16JMvUzMBmdRMam6APAFkUjMBuVEzAZnUvAFkUjMBmdRMQCY1N0AmNZtOqhadVC06qVr0yZcBeQPIpGYCcqNmAnKjZgLyBJBJzRNAboA8AeQGyKTmjZOqRSdVi06qFuGP/IcBeULNJiCb1DwBZJOaN06qFp1ULTqpWvTJS0B+k5pJzRNAbtTcAJnU3AB5A8ik5g0133RSteikatFJ1aJPlqnZBOQGyKRmAjKpeQLIDZBJzaTmBsiNmjfUTEAmNZtOqhadVC06qVr0yZcBeULNn0TNBOQGyKTmCSBvqJmA3ACZ1LxxUrXopGrRSdWiT/4yQCY1E5A31ExAboBMam7UvAHk33RSteikatFJ1aJP/jJqJiBPqJmATECeUPMGkCfU3ACZ1Gw6qVp0UrXopGrRJ1+m5pvUPKHmDTUTkEnNBOQNNROQSc0EZFLzm06qFp1ULTqpWvTJMiC/CciNmgnIpGYC8gaQGzU3QCY1T6iZgExqvumkatFJ1aKTqkX4I1VLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkX/APUCNUmofk9rAAAAAElFTkSuQmCC',
    });
  });
});
