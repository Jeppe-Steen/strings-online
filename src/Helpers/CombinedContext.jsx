const CombinedContext = (providers) => providers.reduce(
    (combined, Provider) => ({ children }) => (
        <combined>
            <Provider>{children}</Provider>
        </combined>
    )
)

export { CombinedContext };