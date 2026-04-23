import Container from '../common/Container';
import AnimatedCounter from '../ui/AnimatedCounter';

const StatsBar = () => {
  const stats = [
    { label: 'Homes Analyzed', target: '12,450+', icon: '🏠' },
    { label: 'Risk Score Found', target: '98/100', icon: '🎯' },
    { label: 'Benefits Unlocked', target: '₹4.2 Cr', icon: '💰' },
    { label: 'Service Bookings', target: '8,900+', icon: '🔧' },
  ];

  return (
    <section className="py-12 bg-black/20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsBar;
