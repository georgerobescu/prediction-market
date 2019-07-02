/*
 * This outer wrapper function takes in this.props when called (in order to
 * get ongoingTransactionType and setOngoingTransactionType)
 */
export default function asWrappedTransaction({ ongoingTransactionType, setOngoingTransactionType }) {
  // Below is the inner function that is passed to the children components (e.g. BuySection, etc.)
  return (wrappedTransactionType, transactionFn, setError) => (
    async () => {
      if (ongoingTransactionType !== null) {
        throw new Error(
          `Attempted to ${wrappedTransactionType} while transaction to ${ongoingTransactionType} is ongoing`
        );
      }

      try {
        setOngoingTransactionType(wrappedTransactionType);
        await transactionFn();
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setOngoingTransactionType(null);
        // triggerSync();
      }
    }
  );
};